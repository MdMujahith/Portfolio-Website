"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
 * SURVIVAL TOAST: Injected into the DOM so it 
 * doesn't get destroyed when the modal unmounts,
 * but styled to perfectly match your Toast.tsx!
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
  const email = siteConfig.owner.email;

  const handleCopyEmail = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await navigator.clipboard.writeText(email);
      onEmailCopied?.();
      onClose(); 
      fireToast("Email copied to clipboard"); 
    } catch (err) {
      console.error("Clipboard write failed:", err);
      // Fallback copy logic
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        onEmailCopied?.();
        onClose();
        fireToast("Email copied to clipboard");
      } catch (copyErr) {
        console.error("Fallback copy failed:", copyErr);
      } finally {
        document.body.removeChild(textArea);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="rounded-2xl shadow-2xl max-w-sm w-full p-6 border"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)" }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Let&apos;s Talk
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Please use email for professional inquiries or potential offers.
              For other queries, feel free to use my social media handles. Thanks!
            </p>

            <p className="sr-only">
              Email: {obfuscateEmail(email)}
            </p>

            <div className="space-y-3 flex flex-col">
              <button
                type="button"
                onClick={handleCopyEmail}
                disabled={isProcessing}
                className="btn-primary w-full"
              >
                {isProcessing ? "Copying…" : "Copy Email Address"}
              </button>
              
              {/* Changed from a <button> to a Next.js <Link> */}
              <Link
                href={formHref}
                onClick={onClose}
                className="btn-outline w-full flex items-center justify-center"
              >
                Go to Contact Form
              </Link>
            </div>

            <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              I had to use this pop-up to avoid spam bots. Sorry for the extra step!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;