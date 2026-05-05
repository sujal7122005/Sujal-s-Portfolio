"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp } from "@/lib/animations";
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

  const inputBaseClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[var(--accent-cyan)]/50 focus:shadow-[0_0_15px_rgba(255,51,51,0.08)] font-[family-name:var(--font-dm-sans)] placeholder:text-white/20";

  return (
    <section id="contact" className="bg-[var(--bg-primary)] px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 06 CONTACT" heading="Let's Connect" />
        <p className="-mt-6 mb-10 max-w-2xl text-[var(--text-secondary)] text-base sm:text-lg font-[family-name:var(--font-dm-sans)]">
          Open to SDE and Full-Stack internship opportunities. Whether you have a
          role, a project, or just want to talk tech — my inbox is open.
        </p>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 md:p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[12px] uppercase tracking-[0.22em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                {...register("name")}
                className={inputBaseClass}
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[12px] uppercase tracking-[0.22em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className={inputBaseClass}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-[12px] uppercase tracking-[0.22em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                {...register("subject")}
                className={inputBaseClass}
              />
              {errors.subject && (
                <p className="text-sm text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-[12px] uppercase tracking-[0.22em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                {...register("message")}
                className={`${inputBaseClass} resize-none`}
              />
              {errors.message && (
                <p className="text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            <MagneticButton
              type="submit"
              variant="filled"
              disabled={isSubmitting}
              className="w-full justify-center sm:w-auto"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                "Send Message →"
              )}
            </MagneticButton>

            {feedback && (
              <p
                className={`text-sm ${
                  status === "success" ? "text-[var(--accent-green)]" : "text-red-400"
                }`}
              >
                {status === "success" ? "✓ " : "✗ "}
                {feedback}
              </p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.aside
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Contact details */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
              <h3 className="text-[12px] uppercase tracking-[0.22em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)] mb-4">
                Contact Info
              </h3>
              <div className="space-y-3 text-[var(--text-secondary)] font-[family-name:var(--font-dm-sans)]">
                <p className="flex items-center gap-3">
                  <span className="text-[var(--accent-cyan)]">📧</span>
                  <a href={`mailto:${CONTACT_DETAILS.email}`} className="transition-colors hover:text-[var(--accent-cyan)]">
                    {CONTACT_DETAILS.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[var(--accent-cyan)]">📱</span>
                  <a href={`tel:${CONTACT_DETAILS.phone}`} className="transition-colors hover:text-[var(--accent-cyan)]">
                    {CONTACT_DETAILS.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
              <h3 className="text-[12px] uppercase tracking-[0.22em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)] mb-4">
                Find Me On
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <MagneticButton
                    key={social.label}
                    href={social.url}
                    variant="outline"
                    className="px-4 py-2 text-[11px]"
                  >
                    {social.label} ↗
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div className="rounded-2xl border border-[var(--accent-green)]/15 bg-[var(--accent-green)]/[0.03] p-5 sm:p-6">
              <p className="flex items-center gap-3 text-[var(--text-primary)] text-sm font-[family-name:var(--font-dm-sans)]">
                <span className="relative inline-flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)]/60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent-green)]" />
                </span>
                {CONTACT_DETAILS.status}
              </p>
              <p className="mt-2 text-[var(--text-dim)] text-xs font-[family-name:var(--font-dm-sans)]">
                Currently seeking opportunities for Summer 2026
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
