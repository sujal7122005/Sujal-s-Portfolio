import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUJAL_SYSTEM_PROMPT } from "@/lib/sujal-context";

export const runtime = "nodejs";

/* ─── Rate limiter (in-memory, per IP) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodically clean stale entries (every 5 minutes)
if (typeof globalThis !== "undefined") {
  const CLEANUP_INTERVAL = 5 * 60_000;
  let lastCleanup = Date.now();

  // We'll piggy-back cleanup on requests instead of setInterval to avoid
  // edge-runtime issues. The check happens at most once per interval.
  (globalThis as Record<string, unknown>).__chatCleanup = () => {
    const now = Date.now();
    if (now - lastCleanup > CLEANUP_INTERVAL) {
      lastCleanup = now;
      for (const [key, val] of rateLimitMap.entries()) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
  };
}

/* ─── Input sanitization ─── */
function sanitize(text: string): string {
  return text
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[^\S\n]+/g, " ") // collapse whitespace
    .trim();
}

/* ─── Message schema ─── */
interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface RequestBody {
  messages?: ChatMessage[];
}

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TO_API = 10; // only send last N messages to Gemini

export async function POST(request: Request) {
  try {
    // Run periodic cleanup
    const cleanup = (globalThis as Record<string, unknown>).__chatCleanup;
    if (typeof cleanup === "function") cleanup();

    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    // Content type check
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type." },
        { status: 400 },
      );
    }

    // Parse body
    const body = (await request.json()) as RequestBody;

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 },
      );
    }

    if (body.messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "Too many messages in conversation." },
        { status: 400 },
      );
    }

    // Validate and sanitize messages
    const sanitizedMessages: ChatMessage[] = [];
    for (const msg of body.messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        return NextResponse.json(
          { error: "Invalid message format." },
          { status: 400 },
        );
      }

      if (msg.role !== "user" && msg.role !== "model") {
        return NextResponse.json(
          { error: "Invalid message role." },
          { status: 400 },
        );
      }

      const cleaned = sanitize(msg.content);
      if (cleaned.length === 0) continue;
      
      // Only enforce length limits on user messages (bot responses can be longer)
      if (msg.role === "user" && cleaned.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json(
          { error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.` },
          { status: 400 },
        );
      }

      sanitizedMessages.push({ role: msg.role, content: cleaned });
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages provided." },
        { status: 400 },
      );
    }

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat service is not configured. Please try again later." },
        { status: 503 },
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: SUJAL_SYSTEM_PROMPT,
    });

    // Build conversation history (only send last N messages)
    const recentMessages = sanitizedMessages.slice(-MAX_HISTORY_TO_API);
    
    // Gemini API requires the chat history to always start with a 'user' message.
    // If our truncation left a 'model' message at the front, remove it.
    while (recentMessages.length > 0 && recentMessages[0].role !== "user") {
      recentMessages.shift();
    }

    const lastMessage = recentMessages.pop();

    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from the user." },
        { status: 400 },
      );
    }

    // Convert history to Gemini format
    const history = recentMessages.map((msg) => ({
      role: msg.role === "model" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }],
    }));

    // Start chat and stream response
    const chat = model.startChat({ history });

    const result = await chat.sendMessageStream(lastMessage.content);

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Gemini stream error:", err);
          controller.enqueue(
            encoder.encode("\n\nSorry, I encountered an issue. Please try again."),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
