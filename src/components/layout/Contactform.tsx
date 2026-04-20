"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/components/ui/Toast";

type Status = "idle" | "sending" | "sent" | "error";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

const appleSpring = { type: "spring", damping: 25, stiffness: 200 } as const;
const fadeSpring  = { type: "spring", damping: 30, stiffness: 150 } as const;

const ContactForm: React.FC = () => {
  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [toast,  setToast]  = useState<ToastState | null>(null);
  const [time,   setTime]   = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string, type: ToastState["type"] = "success") =>
    setToast({ message, type });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── FIXED handleSubmit ──────────────────────────────────────
  // Posts to your own Next.js API route (/api/contact).
  // That route calls Apps Script server-side — no CORS ever.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Submission failed.");
      }

      setStatus("sent");

    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      showToast(msg, "error");
    }
  };

  /* ============================================
   * SUCCESS STATE
   * ============================================ */
  if (status === "sent") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] text-center px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={appleSpring}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 md:w-20 md:h-20 mb-5 md:mb-6 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          style={{ background: "var(--text-primary)", color: "var(--bg)" }}
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-2 md:mb-3 text-[var(--text-primary)]">
          Message Sent
        </h2>
        <p className="text-[15px] md:text-[17px] text-[var(--text-secondary)] max-w-sm mb-8 md:mb-10 leading-relaxed">
          Thanks for reaching out. I&apos;ll review your message and get back to you shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center px-8 py-3.5 md:py-4 rounded-full font-medium text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
            style={{ background: "var(--text-primary)", color: "var(--bg)" }}
          >
            Back to Home
          </Link>
          <button
            onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setStatus("idle"); }}
            className="flex items-center justify-center px-8 py-3.5 md:py-4 rounded-full font-medium text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98] border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-[0_2px_10px_rgb(0,0,0,0.04)]"
          >
            Send Another
          </button>
        </div>
      </motion.div>
    );
  }

  /* ============================================
   * SPLIT LAYOUT FORM
   * ============================================ */
  return (
    <>
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12 md:pt-4 md:pb-20">

        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-[14px] md:text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6 md:mb-10"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={fadeSpring}
            className="flex flex-col h-full"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
              Let&apos;s start a <br className="hidden sm:block" /> conversation.
            </h1>
            <p className="text-[16px] md:text-[17px] text-[var(--text-secondary)] max-w-md leading-relaxed mb-8 md:mb-10">
              I&apos;m currently open to new opportunities. Whether it&apos;s a full-stack role, a freelance project, or just a quick chat—my inbox is open.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-auto">

              {/* Widget 1: Availability */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 md:p-6 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] flex flex-col justify-between min-h-[140px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </div>
                  <span className="text-[12px] md:text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Status
                  </span>
                </div>
                <p className="text-[14px] md:text-[15px] font-medium text-[var(--text-primary)] leading-snug">
                  Actively seeking full-stack &amp; React roles.
                </p>
              </motion.div>

              {/* Widget 2: Live Clock */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden p-5 md:p-6 rounded-3xl flex flex-col justify-between min-h-[140px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.14)] transition-shadow duration-300"
                style={{ background: "var(--text-primary)" }}
              >
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex items-center justify-between mb-2">
                  <span className="text-[12px] md:text-[13px] font-semibold text-[var(--bg)] uppercase tracking-wider opacity-80">
                    Local Time
                  </span>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--bg)] opacity-80">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="text-2xl md:text-3xl font-semibold text-[var(--bg)] tracking-tight">
                    {time ? time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "••:••"}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[var(--bg)] opacity-80 mt-1 font-medium">
                    India (IST)
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeSpring, delay: 0.1 }}
            className="lg:pl-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">

                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label className="text-[13px] font-semibold text-[var(--text-secondary)] ml-1 md:ml-2">Name</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl px-4 py-3.5 text-[15px] text-[var(--text-primary)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] focus:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label className="text-[13px] font-semibold text-[var(--text-secondary)] ml-1 md:ml-2">Email</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl px-4 py-3.5 text-[15px] text-[var(--text-primary)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] focus:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-300"
                  />
                </div>

              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label className="text-[13px] font-semibold text-[var(--text-secondary)] ml-1 md:ml-2">Subject</label>
                <input
                  type="text" name="subject" value={form.subject} onChange={handleChange}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl px-4 py-3.5 text-[15px] text-[var(--text-primary)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] focus:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label className="text-[13px] font-semibold text-[var(--text-secondary)] ml-1 md:ml-2">Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl px-4 py-3.5 text-[15px] text-[var(--text-primary)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] focus:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-300 resize-y"
                />
              </div>

              <div className="pt-4 md:pt-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center py-4 rounded-full font-medium text-[16px] shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                  style={{ background: "var(--text-primary)", color: "var(--bg)" }}
                >
                  {status === "sending" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[var(--bg)] border-t-transparent rounded-full"
                    />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;