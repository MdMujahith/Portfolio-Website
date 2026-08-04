"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, ArrowRight, X, Check } from "lucide-react";
import { siteConfig } from "@/data/site.config";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailCopied?: () => void;
  onSuccess?: () => void;
  formHref?: string;
}

/* ============================================
 * SECURITY: Email Obfuscation
 * ============================================ */
const obfuscateEmail = (email: string): string =>
  email.replace("@", "[at]").replace(".", "[dot]");

/* ============================================
 * SURVIVAL TOAST: Restored to original top/green style
 * ============================================ */
const fireToast = (message: string) => {
  // Remove existing toast to avoid stacking
  const existing = document.getElementById("global-survival-toast");
  if (existing) existing.remove();

  const el = document.createElement("div");
  el.id = "global-survival-toast";
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.style.cssText = [
    "position: fixed",
    "top: 24px",
    "left: 50%",
    "transform: translateX(-50%) translateY(-16px) scale(0.95)",
    "background: var(--success, #10b981)",
    "color: #ffffff",
    "font-family: var(--font-sans, inherit)",
    "font-size: 14px",
    "font-weight: 500",
    "padding: 12px 20px",
    "border-radius: 9999px",
    "display: flex",
    "align-items: center",
    "gap: 8px",
    "z-index: 9999",
    "opacity: 0",
    "box-shadow: 0 4px 24px rgba(0,0,0,0.18)",
    "transition: opacity 0.25s ease-out, transform 0.25s ease-out",
    "pointer-events: none",
    "white-space: nowrap",
  ].join(";");

  // Uses the same success SVG icon as your Toast.tsx
  el.innerHTML = `
    <svg width="16" height="16" fill="none" stroke="currentColor"
      viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
      <path d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(el);

  // Animate In
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateX(-50%) translateY(0) scale(1)";
  });

  // Animate Out & Cleanup
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(-16px) scale(0.95)";
    setTimeout(() => {
      if (document.body.contains(el)) document.body.removeChild(el);
    }, 250);
  }, 3000);
};

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onEmailCopied,
  formHref = "/contact",
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = siteConfig.owner.email;

  const handleCopyEmail = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await navigator.clipboard.writeText(email);
      handleSuccess();
    } catch (err) {
      console.error("Clipboard write failed:", err);
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        handleSuccess();
      } catch (copyErr) {
        console.error("Fallback copy failed:", copyErr);
      } finally {
        document.body.removeChild(textArea);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccess = () => {
    setCopied(true);
    fireToast("Email copied to clipboard");
    onEmailCopied?.();
    // Slight delay before closing so user sees the checkmark
    setTimeout(() => {
      onClose();
      setCopied(false);
    }, 600); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative w-full max-w-[400px] p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border flex flex-col items-center text-center overflow-hidden"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)" }}
            /* High-end spring physics for the modal entrance */
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full transition-colors hover:bg-[var(--bg-subtle)] group"
              aria-label="Close modal"
            >
              <X size={20} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
            </button>

            {/* Icon Badge */}
            <div 
              className="w-14 h-14 mb-6 rounded-full flex items-center justify-center border"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
            >
              <Mail size={24} style={{ color: "var(--text-primary)" }} />
            </div>

            <h2 className="text-2xl font-semibold mb-3 tracking-tight" style={{ color: "var(--text-primary)" }}>
              Let&apos;s Talk
            </h2>
            
            <p className="text-[15px] leading-relaxed mb-8 max-w-[280px]" style={{ color: "var(--text-secondary)" }}>
              Please use email for professional inquiries. For quick chats, hit me up on social media!
            </p>

            <p className="sr-only">
              Email: {obfuscateEmail(email)}
            </p>

            {/* Actions Container */}
            <div className="flex flex-col gap-3 w-full">
              {/* Solid Primary Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                disabled={isProcessing}
                className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full font-medium text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-transparent disabled:opacity-70 disabled:hover:scale-100"
                style={{ background: "var(--text-primary)", color: "var(--bg)" }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} className="transition-transform group-hover:scale-110" />}
                {copied ? "Copied!" : "Copy Email Address"}
              </button>
              
              {/* Ghost Outline Button */}
              <Link
                href={formHref}
                onClick={onClose}
                className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-medium text-[15px] transition-all duration-300 border hover:bg-[var(--bg-subtle)] active:scale-95"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
              >
                Go to Contact Form
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="text-[12px] mt-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Protected by this pop-up to avoid spam bots.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;