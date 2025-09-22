"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailCopied: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onEmailCopied }) => {
  const email = 'your-email@example.com'; // IMPORTANT: Replace with your actual email

  const handleSendEmail = () => {
    window.location.href = `mailto:${email}`;
    onClose();
  };
  
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      onEmailCopied(); // This will trigger the toast
      onClose();
    } catch (err) {
      console.error('Failed to copy email:', err);
      // Fallback for older browsers or insecure contexts
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onEmailCopied();
      onClose();
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
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Let's Talk</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Please use email for professional inquiries or potential offers. For other queries, feel free to use my social media handles. Thanks!
            </p>
            <div className="space-y-3">
              <button
                onClick={handleSendEmail}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-transform active:scale-95"
              >
                Yes, I'll send an email
              </button>
              <button
                onClick={handleCopyEmail}
                className="w-full bg-transparent text-gray-700 py-3 px-4 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-transform active:scale-95"
              >
                Let me copy the email
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              I had to use this pop-up to avoid spam bots. Sorry for the extra step!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;