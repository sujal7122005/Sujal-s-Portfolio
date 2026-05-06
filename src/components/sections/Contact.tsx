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

const schema = z.object({
  name: z.string().min(2, "Too short").max(80),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Too short").max(120),
  message: z.string().min(20, "At least 20 characters").max(1200),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormData) => {
    setSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setStatus("success");
      setFeedback(data.message ?? "Message sent!");
      reset();
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] text-[15px] outline-none transition-colors focus:border-[var(--accent)]/40 placeholder:text-[var(--text-dim)]";

  return (
    <section id="contact" className="px-5 sm:px-8 py-24 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle label="Contact" heading="Let's Connect" />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <label htmlFor="name" className="block text-[12px] font-medium uppercase tracking-wider text-[var(--text-dim)] mb-2 font-[family-name:var(--font-mono)]">Name</label>
              <input id="name" {...register("name")} className={inputClass} placeholder="Your name" suppressHydrationWarning />
              {errors.name && <p className="text-red-400 text-[13px] mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-[12px] font-medium uppercase tracking-wider text-[var(--text-dim)] mb-2 font-[family-name:var(--font-mono)]">Email</label>
              <input id="email" type="email" {...register("email")} className={inputClass} placeholder="you@email.com" suppressHydrationWarning />
              {errors.email && <p className="text-red-400 text-[13px] mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-[12px] font-medium uppercase tracking-wider text-[var(--text-dim)] mb-2 font-[family-name:var(--font-mono)]">Subject</label>
              <input id="subject" {...register("subject")} className={inputClass} placeholder="What's this about?" suppressHydrationWarning />
              {errors.subject && <p className="text-red-400 text-[13px] mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-[12px] font-medium uppercase tracking-wider text-[var(--text-dim)] mb-2 font-[family-name:var(--font-mono)]">Message</label>
              <textarea id="message" rows={5} {...register("message")} className={`${inputClass} resize-none`} placeholder="Tell me about your project or opportunity..." />
              {errors.message && <p className="text-red-400 text-[13px] mt-1">{errors.message.message}</p>}
            </div>

            <MagneticButton type="submit" variant="filled" disabled={submitting} className="w-full sm:w-auto" suppressHydrationWarning>
              {submitting ? "Sending..." : "Send Message →"}
            </MagneticButton>

            {feedback && (
              <p className={`text-[13px] ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {feedback}
              </p>
            )}
          </motion.form>

          {/* Info sidebar */}
          <motion.div
            className="space-y-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h3 className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-dim)] mb-4 font-[family-name:var(--font-mono)]">Get in touch</h3>
              <div className="space-y-3 text-[15px]">
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {CONTACT_DETAILS.email}
                </a>
                <a href={`tel:${CONTACT_DETAILS.phone}`} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {CONTACT_DETAILS.phone}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h3 className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-dim)] mb-4 font-[family-name:var(--font-mono)]">Links</h3>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <MagneticButton key={social.label} href={social.url} variant="outline" className="text-[12px]">
                    {social.label} ↗
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-green-500/15 bg-green-500/[0.04] p-6">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-[14px] text-[var(--text-primary)] font-medium">{CONTACT_DETAILS.status}</span>
              </div>
              <p className="text-[13px] text-[var(--text-dim)] mt-2">Currently seeking Summer 2026 opportunities</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
