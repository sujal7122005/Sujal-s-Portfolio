"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════ */
interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  followUps?: string[];
}

/* ═══════════════════════════════════════════════════════
   Suggested questions (initial state)
   ═══════════════════════════════════════════════════════ */
const SUGGESTIONS = [
  "What are Sujal's skills?",
  "Tell me about his projects",
  "How can I contact Sujal?",
  "What's his education?",
];

/* ═══════════════════════════════════════════════════════
   Time-of-day greeting
   ═══════════════════════════════════════════════════════ */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Hey there, night owl! 🦉";
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 👋";
  if (hour < 21) return "Good evening! 🌆";
  return "Hey there, night owl! 🦉";
}

function getWelcomeMessage(): Message {
  return {
    id: "welcome",
    role: "model",
    content: `${getGreeting()} I'm Sujal's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
  };
}

/* ═══════════════════════════════════════════════════════
   Smart follow-up generator (keyword-based)
   ═══════════════════════════════════════════════════════ */
function generateFollowUps(botResponse: string): string[] {
  const lower = botResponse.toLowerCase();
  const followUps: string[] = [];

  if (lower.includes("project") || lower.includes("unsaid") || lower.includes("pupple") || lower.includes("videotube") || lower.includes("agenticpilot")) {
    if (lower.includes("unsaid")) followUps.push("How does Unsaid's AI work?");
    if (lower.includes("agenticpilot")) followUps.push("What does AgenticPilot automate?");
    if (lower.includes("videotube")) followUps.push("What APIs does VideoTube have?");
    if (lower.includes("pupple")) followUps.push("What stack does Pupple use?");
    if (followUps.length === 0) followUps.push("Tell me more about Unsaid");
    followUps.push("What tech stack does he prefer?");
  } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("language") || lower.includes("framework")) {
    followUps.push("What projects has he built?");
    followUps.push("What's his strongest skill?");
  } else if (lower.includes("education") || lower.includes("cgpa") || lower.includes("vgec") || lower.includes("degree")) {
    followUps.push("What's his leadership experience?");
    followUps.push("What certifications does he have?");
  } else if (lower.includes("contact") || lower.includes("email") || lower.includes("linkedin") || lower.includes("github")) {
    followUps.push("Is he available for internships?");
    followUps.push("What are his projects?");
  } else if (lower.includes("certification") || lower.includes("hackathon") || lower.includes("workshop")) {
    followUps.push("Tell me about his projects");
    followUps.push("What skills does he have?");
  } else if (lower.includes("e-cell") || lower.includes("leader") || lower.includes("team")) {
    followUps.push("What events has he organized?");
    followUps.push("What's his education background?");
  } else {
    followUps.push("What are his top projects?");
    followUps.push("How can I contact Sujal?");
  }

  return followUps.slice(0, 3);
}

/* ═══════════════════════════════════════════════════════
   Minimal markdown renderer
   ═══════════════════════════════════════════════════════ */
function renderMarkdown(text: string): ReactNode[] {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Bullet list items
    if (/^[\s]*[-*•]\s/.test(line)) {
      const content = line.replace(/^[\s]*[-*•]\s/, "");
      nodes.push(
        <div key={i} className="flex gap-1.5 ml-1 mb-0.5">
          <span className="text-red-400 mt-[2px] shrink-0">•</span>
          <span>{renderInline(content)}</span>
        </div>,
      );
      continue;
    }

    // Numbered list items
    if (/^[\s]*\d+[.)]\s/.test(line)) {
      const num = line.match(/^[\s]*(\d+)[.)]\s/)?.[1] ?? "";
      const content = line.replace(/^[\s]*\d+[.)]\s/, "");
      nodes.push(
        <div key={i} className="flex gap-1.5 ml-1 mb-0.5">
          <span className="text-red-400 font-medium shrink-0">{num}.</span>
          <span>{renderInline(content)}</span>
        </div>,
      );
      continue;
    }

    // Empty line → spacing
    if (line.trim() === "") {
      nodes.push(<div key={i} className="h-1.5" />);
      continue;
    }

    // Regular line
    nodes.push(
      <div key={i} className="mb-0.5">
        {renderInline(line)}
      </div>,
    );
  }

  return nodes;
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Match: **bold**, *italic*, `code`, [text](url)
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      parts.push(
        <strong key={match.index} className="font-semibold">
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      // *italic*
      parts.push(
        <em key={match.index} className="italic">
          {match[3]}
        </em>,
      );
    } else if (match[4]) {
      // `code`
      parts.push(
        <code
          key={match.index}
          className="text-[12px] px-1 py-0.5 rounded bg-white/10 text-red-400 font-mono"
        >
          {match[4]}
        </code>,
      );
    } else if (match[5] && match[6]) {
      // [text](url)
      parts.push(
        <a
          key={match.index}
          href={match[6]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-2 text-red-400 hover:text-red-300 transition-colors"
        >
          {match[5]} ↗
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/* ═══════════════════════════════════════════════════════
   Sound effects (tiny inline audio)
   ═══════════════════════════════════════════════════════ */
function useSoundEffects() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.08) => {
      if (mutedRef.current) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        /* ignore audio errors */
      }
    },
    [getCtx],
  );

  const playSend = useCallback(() => {
    playTone(880, 0.1, "sine", 0.06);
    setTimeout(() => playTone(1100, 0.08, "sine", 0.04), 60);
  }, [playTone]);

  const playReceive = useCallback(() => {
    playTone(660, 0.12, "sine", 0.05);
    setTimeout(() => playTone(880, 0.1, "sine", 0.03), 80);
  }, [playTone]);

  const playOpen = useCallback(() => {
    playTone(440, 0.08, "sine", 0.04);
    setTimeout(() => playTone(660, 0.1, "sine", 0.05), 50);
    setTimeout(() => playTone(880, 0.08, "sine", 0.04), 100);
  }, [playTone]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    return mutedRef.current;
  }, []);

  return { playSend, playReceive, playOpen, toggleMute, isMuted: () => mutedRef.current };
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
export function Chatbot() {
  const welcomeMsg = useMemo(() => getWelcomeMessage(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMsg]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { playSend, playReceive, playOpen, toggleMute } = useSoundEffects();

  // Auto-open on first visit after 2 seconds
  useEffect(() => {
    const hasVisited = localStorage.getItem("chatbot_visited");
    if (!hasVisited) {
      setIsFirstVisit(true);
      const badgeTimer = setTimeout(() => setShowBadge(true), 800);
      const openTimer = setTimeout(() => {
        setIsOpen(true);
        setShowBadge(false);
        localStorage.setItem("chatbot_visited", "true");
        playOpen();
      }, 2000);
      return () => {
        clearTimeout(badgeTimer);
        clearTimeout(openTimer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) playOpen();
      return !prev;
    });
    setShowBadge(false);
    if (isFirstVisit) {
      localStorage.setItem("chatbot_visited", "true");
      setIsFirstVisit(false);
    }
  }, [isFirstVisit, playOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setInput("");
      playSend();

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      const botMsgId = `model-${Date.now()}`;
      const botMsg: Message = {
        id: botMsgId,
        role: "model",
        content: "",
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setIsStreaming(true);

      try {
        const history = [...messages.filter((m) => m.id !== "welcome"), userMsg].map(
          (m) => ({ role: m.role, content: m.content }),
        );

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) {
          const errorData = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(errorData.error ?? "Failed to get response");
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const currentText = accumulated;

          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, content: currentText } : m)),
          );
        }

        // Generate follow-ups and play receive sound
        if (accumulated.trim()) {
          const followUps = generateFollowUps(accumulated);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId ? { ...m, content: accumulated, followUps } : m,
            ),
          );
          playReceive();
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? { ...m, content: "Sorry, I couldn't generate a response. Please try again." }
                : m,
            ),
          );
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Something went wrong";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId ? { ...m, content: errMsg } : m,
          ),
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming, playSend, playReceive],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleMuteToggle = () => {
    const nowMuted = toggleMute();
    setIsMuted(nowMuted);
  };

  const showSuggestions = messages.length <= 1 && !isStreaming;

  // Find the last model message to show follow-ups
  const lastModelMsg = [...messages].reverse().find((m) => m.role === "model" && m.followUps?.length);

  return (
    <>
      {/* ─── FAB (Floating Action Button) ─── */}
      <div className="fixed z-[9999] bottom-5 right-5 sm:bottom-8 sm:right-8">
        {/* Notification badge */}
        <AnimatePresence>
          {showBadge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-2 -left-2 z-10 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
              style={{ background: "var(--accent, #e60000)", boxShadow: "0 0 0 3px var(--bg-card, #fff)" }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple ring animation */}
        {!isOpen && isFirstVisit && (
          <span className="absolute inset-0 rounded-full chatbot-ripple" />
        )}

        <motion.button
          onClick={toggleOpen}
          className="relative h-14 w-14 rounded-full flex items-center justify-center border-none outline-none transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{
            background: "var(--accent, #e60000)",
            color: "#fff",
            boxShadow: "0 2px 16px rgba(230, 0, 0, 0.3)",
          }}
          aria-label={isOpen ? "Close chat" : "Ask About Sujal"}
          whileTap={{ scale: 0.9 }}
          animate={!isOpen && isFirstVisit ? { scale: [1, 1.12, 1] } : {}}
          transition={
            !isOpen && isFirstVisit
              ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              : {}
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[9998] flex flex-col overflow-hidden rounded-lg border border-white/10 bottom-5 right-5 sm:bottom-8 sm:right-8 max-sm:inset-3 max-sm:bottom-3"
            style={{
              width: "min(50vw, calc(100vw - 40px))",
              height: "min(calc(100vh - 120px), calc(100vh - 80px))",
              maxWidth: "680px",
              minWidth: "360px",
              background: "#1a1d21",
            }}
          >
            {/* ── Header with animated gradient ── */}
            <div className="relative flex items-center gap-3 px-5 py-4 shrink-0 overflow-hidden chatbot-header">
              {/* Animated gradient background */}
              <div className="absolute inset-0 chatbot-header-gradient" />

              {/* Content on top of gradient */}
              <div className="relative flex items-center gap-3 flex-1 min-w-0">
                {/* Animated avatar with online pulse */}
                <div className="relative">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white text-[13px] font-bold tracking-wide backdrop-blur-sm">
                    SP
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-[var(--accent,#e60000)] chatbot-online-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-white leading-tight">
                    Ask About Sujal
                  </h3>
                  <p className="text-[11px] text-white/70 leading-tight mt-0.5">
                    {isStreaming ? (
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 chatbot-online-pulse" />
                        typing...
                      </span>
                    ) : (
                      "AI-powered · Always online"
                    )}
                  </p>
                </div>
              </div>

              {/* Header actions */}
              <div className="relative flex items-center gap-1">
                {/* Mute toggle */}
                <button
                  onClick={handleMuteToggle}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
                  title={isMuted ? "Unmute sounds" : "Mute sounds"}
                >
                  {isMuted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chatbot-messages" style={{ background: "#1a1d21" }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={idx > 0 ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "model" && (
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mr-2 mt-1"
                      style={{ background: "var(--accent, #e60000)", color: "#fff" }}
                    >
                      SP
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#e60000] text-white rounded-br-sm"
                        : "bg-[#25292e] text-[#e0e4e8] border border-white/[0.06] rounded-bl-sm"
                    }`}
                  >
                    {msg.content ? (
                      msg.role === "model" ? (
                        <div className="chatbot-md">{renderMarkdown(msg.content)}</div>
                      ) : (
                        msg.content
                      )
                    ) : (
                      /* Terminal-style thinking indicator */
                      <div className="flex items-center gap-2 py-0.5 font-mono text-[12px] text-[#8892a4]">
                        <span className="text-red-400">&gt;</span>
                        <span>Sujal&apos;s AI is thinking</span>
                        <span className="chatbot-terminal-cursor" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Smart follow-up chips after last bot message */}
              {!isStreaming && lastModelMsg && lastModelMsg.followUps && messages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-wrap gap-1.5 ml-9"
                >
                  {lastModelMsg.followUps.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[11px] px-2.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[#8892a4] hover:border-red-500/40 hover:text-red-400 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Initial suggestions ── */}
            {showSuggestions && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTIONS.map((q, idx) => (
                  <motion.button
                    key={q}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx + 0.2, duration: 0.2 }}
                    onClick={() => sendMessage(q)}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[#8892a4] hover:border-red-500/40 hover:text-red-400 transition-all duration-200"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Input area ── */}
            <div className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3 shrink-0" style={{ background: "#1e2126" }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Sujal..."
                disabled={isStreaming}
                maxLength={500}
                className="flex-1 rounded-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-[14px] text-[#e0e4e8] outline-none transition-colors focus:border-red-500/50 placeholder:text-[#555b65] disabled:opacity-50"
                aria-label="Type your message"
              />
              <motion.button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-30"
                style={{
                  background: "#e60000",
                  color: "#fff",
                }}
                aria-label="Send message"
                whileTap={{ scale: 0.85 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </div>

            {/* Powered by footer */}
            <div className="text-center py-1.5 text-[10px] text-[#555b65] border-t border-white/[0.06]" style={{ background: "#1a1d21" }}>
              Powered by Gemini AI ✦ Built by Sujal
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Styles ─── */}
      <style jsx global>{`
        /* Terminal cursor blink */
        .chatbot-terminal-cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: var(--accent, #e60000);
          animation: chatbot-cursor-blink 1s steps(1) infinite;
          margin-left: 1px;
          vertical-align: middle;
        }
        @keyframes chatbot-cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Header animated gradient */
        .chatbot-header-gradient {
          background: linear-gradient(
            135deg,
            var(--accent, #e60000) 0%,
            #b30000 40%,
            #25282b 100%
          );
          background-size: 200% 200%;
          animation: chatbot-gradient-shift 6s ease infinite;
        }
        @keyframes chatbot-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Online pulse */
        .chatbot-online-pulse {
          animation: chatbot-pulse 2s ease-in-out infinite;
        }
        @keyframes chatbot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
          50% { box-shadow: 0 0 0 4px rgba(74, 222, 128, 0); }
        }

        /* Ripple on FAB */
        .chatbot-ripple {
          border: 2px solid var(--accent, #e60000);
          animation: chatbot-ripple-expand 2s ease-out infinite;
        }
        @keyframes chatbot-ripple-expand {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        /* Scrollbar */
        .chatbot-messages::-webkit-scrollbar { width: 4px; }
        .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
        .chatbot-messages::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
        }

        /* Markdown rendering */
        .chatbot-md a { word-break: break-all; }
      `}</style>
    </>
  );
}
