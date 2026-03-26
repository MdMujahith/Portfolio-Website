"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site.config";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailCopied: () => void;
}

/* ============================================
 * SECURITY: Email Obfuscation
 * ============================================
 * Prevents scraping while maintaining accessibility
 */
const obfuscateEmail = (email: string): string => {
  return email.replace("@", "[at]").replace(".", "[dot]");
};

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onEmailCopied,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const email = siteConfig.owner.email;

  /* ============================================
   * RATE LIMITING: Prevent Spam
   * ============================================
   * Limit actions to prevent abuse
   */
  const handleSendEmail = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Open email client
    window.location.href = `mailto:${email}`;

    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  const handleCopyEmail = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Modern Clipboard API (secure contexts only)
      await navigator.clipboard.writeText(email);
      onEmailCopied();
      onClose();
    } catch (err) {
      // Fallback for older browsers
      console.error("Clipboard write failed:", err);
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.setAttribute("aria-hidden", "true");
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
        onEmailCopied();
        onClose();
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="contact-modal-title"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              Let&apos;s Talk
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Please use email for professional inquiries or potential offers.
              For other queries, feel free to use my social media handles.
              Thanks!
            </p>

            {/* Display obfuscated email for screen readers */}
            <p className="sr-only">
              Email: {obfuscateEmail(email)} (Replace [at] with @ and [dot]
              with .)
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSendEmail}
                disabled={isProcessing}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Open email client to send message"
              >
                {isProcessing ? "Opening..." : "Yes, I'll send an email"}
              </button>
              <button
                onClick={handleCopyEmail}
                disabled={isProcessing}
                className="w-full bg-transparent text-gray-700 py-3 px-4 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Copy email address to clipboard"
              >
                {isProcessing ? "Copying..." : "Let me copy the email"}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              I had to use this pop-up to avoid spam bots. Sorry for the extra
              step!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;