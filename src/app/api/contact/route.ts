import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(20).max(1200),
});

let cachedTransporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  // Prefer Gmail OAuth2 if configured (more secure for Google accounts)
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const smtpUser = process.env.SMTP_USER ?? process.env.CONTACT_EMAIL;

  if (googleClientId && googleClientSecret && googleRefreshToken && smtpUser) {
    try {
      const { google } = await import("googleapis");
      const oAuth2Client = new google.auth.OAuth2(
        googleClientId,
        googleClientSecret,
      );

      oAuth2Client.setCredentials({ refresh_token: googleRefreshToken });

      const accessTokenResponse = await oAuth2Client.getAccessToken();
      const accessToken =
        typeof accessTokenResponse === "string"
          ? accessTokenResponse
          : accessTokenResponse?.token ?? null;

      if (!accessToken) {
        console.error("Failed to fetch Gmail OAuth2 access token.");
        return null;
      }

      // Create an OAuth2 transporter for Gmail
      const oauthTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: smtpUser,
          clientId: googleClientId,
          clientSecret: googleClientSecret,
          refreshToken: googleRefreshToken,
          accessToken,
        },
      });

      return oauthTransporter;
    } catch (err) {
      console.error("Failed to create Gmail OAuth2 transporter, falling back to SMTP:", err);
      // fall through to SMTP basic auth below
    }
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  const host =
    process.env.SMTP_HOST ??
    (process.env.GOOGLE_SMTP_APP_PASSWORD ? "smtp.gmail.com" : undefined);
  const user = process.env.SMTP_USER ?? process.env.CONTACT_EMAIL;
  const pass = process.env.GOOGLE_SMTP_APP_PASSWORD ?? process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? "587");

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = contactSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Please provide valid contact details and a message.",
        },
        { status: 400 },
      );
    }

    const transporter = await getTransporter();

    if (!transporter) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured yet. Add SMTP_USER and GOOGLE_SMTP_APP_PASSWORD (or SMTP_* variables) in .env.local.",
        },
        { status: 503 },
      );
    }

    const { name, email, subject, message } = parsedBody.data;
    const safeName = sanitizeHeaderValue(name);
    const safeSubject = sanitizeHeaderValue(subject);
    const safeReplyTo = sanitizeHeaderValue(email);

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ??
        `Portfolio Contact <${
          process.env.SMTP_USER ??
          process.env.CONTACT_EMAIL ??
          "no-reply@example.com"
        }>`,
      to: process.env.CONTACT_EMAIL ?? "sdpatel7122005@gmail.com",
      replyTo: safeReplyTo,
      subject: `[Portfolio] ${safeSubject}`,
      text: [
        "New Portfolio Message",
        "",
        `Name: ${safeName}`,
        `Email: ${email}`,
        `Subject: ${safeSubject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
          <h2>New Portfolio Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: "Thanks for reaching out. Your message has been sent.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact route error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while sending your message.",
      },
      { status: 500 },
    );
  }
}
