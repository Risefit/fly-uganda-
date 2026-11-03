"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

const FIELD =
  "w-full rounded-md border border-aviation/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-aviation focus:outline-none focus:ring-2 focus:ring-aviation/20";

export function ContactForm({
  subjectLabel = "How can we help?",
  subjects = ["General enquiry", "Bookings", "Cargo", "Careers", "Press / media"],
}: {
  subjectLabel?: string;
  subjects?: string[];
}) {
  const [sent, setSent] = useState(false);

  // Placeholder submit — wired to an email service / form backend at launch.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-growth/30 bg-growth/[0.06] p-7">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-growth text-cream">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="font-display text-xl text-ink">Thank you — message received</h3>
        <p className="text-sm text-muted">
          This is a pre-launch demonstration form. Once our systems are live we will respond to your
          enquiry by email. In the meantime, please reach us directly at{" "}
          <a className="font-semibold text-aviation hover:underline" href="mailto:care@flyuganda.com">care@flyuganda.com</a>.
        </p>
        <button onClick={() => setSent(false)} className="btn-ghost mt-1">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-aviation/10 bg-cream p-6 shadow-card sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-ink">Full name</span>
          <input className={FIELD} name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-ink">Email</span>
          <input className={FIELD} name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>
      <label className="mt-4 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-ink">{subjectLabel}</span>
        <select className={FIELD} name="subject" defaultValue={subjects[0]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-ink">Message</span>
        <textarea className={`${FIELD} min-h-[120px] resize-y`} name="message" required placeholder="How can we help?" />
      </label>
      <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
        <Send className="h-4 w-4" aria-hidden />
        Send message
      </button>
      <p className="mt-3 text-xs text-muted">
        By submitting, you agree to our{" "}
        <a href="/legal/privacy" className="underline hover:text-aviation">privacy policy</a>.
      </p>
    </form>
  );
}
