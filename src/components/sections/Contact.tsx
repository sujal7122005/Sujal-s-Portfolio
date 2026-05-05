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
        <p className="max-w-2xl text-white/70 text-base sm:text-lg">
          Open to SDE and Full-Stack internship opportunities. Whether you have a
          role, a project, or just want to talk tech, my inbox is open.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border border-white/15 bg-[var(--bg-secondary)] p-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[12px] uppercase tracking-[0.2em] text-white/60"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full rounded-sm border border-white/20 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-white/60"
              />
              {errors.name && (
                <p className="text-sm text-[var(--brand-red)]">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[12px] uppercase tracking-[0.2em] text-white/60"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-sm border border-white/20 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-white/60"
              />
              {errors.email && (
                <p className="text-sm text-[var(--brand-red)]">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-[12px] uppercase tracking-[0.2em] text-white/60"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                className="w-full rounded-sm border border-white/20 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-white/60"
              />
              {errors.subject && (
                <p className="text-sm text-[var(--brand-red)]">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-[12px] uppercase tracking-[0.2em] text-white/60"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-sm border border-white/20 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-white/60"
              />
              {errors.message && (
                <p className="text-sm text-[var(--brand-red)]">{errors.message.message}</p>
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
                  status === "success" ? "text-white/70" : "text-[var(--brand-red)]"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>

          <aside className="border border-white/15 bg-[var(--bg-secondary)] p-6">
            <div className="space-y-4 text-white/70">
              <p>
                <span className="text-white/50">Email:</span> {CONTACT_DETAILS.email}
              </p>
              <p>
                <span className="text-white/50">Phone:</span> {CONTACT_DETAILS.phone}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                FIND ME ON
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <MagneticButton
                    key={social.label}
                    href={social.url}
                    variant="ghost"
                    className="px-4 py-2 text-[11px]"
                  >
                    {social.label}
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="mt-8 border border-white/15 bg-[#181818] p-4">
              <p className="flex items-center gap-2 text-white/70 text-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-red)]" />
                {CONTACT_DETAILS.status}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
