"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT_DETAILS, SOCIAL_LINKS } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is too short").max(120, "Subject is too long"),
  message: z
    .string()
    .min(20, "Message should be at least 20 characters")
    .max(1200, "Message is too long"),
});

type ContactInput = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setIsSubmitting(true);
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to send message right now.");
      }

      setStatus("success");
      setFeedback(payload.message ?? "Message sent successfully.");
      reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[var(--bg-primary)] px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 06 CONTACT" heading="Let's Connect" />
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg font-[family-name:var(--font-dm-sans)]">
          Open to SDE and Full-Stack internship opportunities. Whether you have a
          role, a project, or just want to talk tech, my inbox is open.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm text-slate-300 font-[family-name:var(--font-dm-sans)]"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              />
              {errors.name && (
                <p className="text-sm text-rose-300">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm text-slate-300 font-[family-name:var(--font-dm-sans)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              />
              {errors.email && (
                <p className="text-sm text-rose-300">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm text-slate-300 font-[family-name:var(--font-dm-sans)]"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              />
              {errors.subject && (
                <p className="text-sm text-rose-300">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm text-slate-300 font-[family-name:var(--font-dm-sans)]"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              />
              {errors.message && (
                <p className="text-sm text-rose-300">{errors.message.message}</p>
              )}
            </div>

            <MagneticButton
              type="submit"
              variant="filled"
              disabled={isSubmitting}
              className="w-full justify-center sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </MagneticButton>

            {feedback && (
              <p
                className={`text-sm ${
                  status === "success" ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="space-y-4 text-slate-300 font-[family-name:var(--font-dm-sans)]">
              <p>
                <span className="text-cyan-300">Email:</span> {CONTACT_DETAILS.email}
              </p>
              <p>
                <span className="text-cyan-300">Phone:</span> {CONTACT_DETAILS.phone}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs tracking-[0.18em] text-cyan-300 font-[family-name:var(--font-jetbrains-mono)]">
                FIND ME ON
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <MagneticButton
                    key={social.label}
                    href={social.url}
                    variant="ghost"
                    className="px-4 py-2 text-xs"
                  >
                    {social.label}
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-emerald-300/20 bg-emerald-300/5 p-4">
              <p className="flex items-center gap-2 text-emerald-200 text-sm font-[family-name:var(--font-dm-sans)]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(0,255,136,0.8)]" />
                {CONTACT_DETAILS.status}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
