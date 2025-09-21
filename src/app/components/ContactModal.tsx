"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SiTwitter, SiGithub, SiLinkedin } from 'react-icons/si';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
            >
                <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-gray-900 text-center">Let's Connect</h2>
            <p className="text-gray-600 text-center mt-4 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="flex justify-center gap-6">
                <a href="https://twitter.com/VishwaGauravIn" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-black transition-colors">
                    <SiTwitter size={24} />
                </a>
                <a href="https://github.com/MdMujahith" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-black transition-colors">
                    <SiGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/mohamedmujahith03" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                    <SiLinkedin size={24} />
                </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;