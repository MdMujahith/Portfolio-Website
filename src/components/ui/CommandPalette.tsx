"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Mail, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/data/site.config";

interface CommandPaletteProps {
  onOpenContact: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  onOpenContact,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const isOpen = controlledIsOpen ?? internalIsOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (onOpenChange) {
        onOpenChange(next);
      } else {
        setInternalIsOpen(next);
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!isOpen);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const commands = useMemo(() => {
    const goToSection = (selector: string) => {
      const el = document.querySelector(selector);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const copyEmail = async () => {
      try {
        await navigator.clipboard.writeText(siteConfig.owner.email);
      } catch {
        const input = document.createElement("textarea");
        input.value = siteConfig.owner.email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
    };

    return [
      {
        id: "skills",
        label: "Jump to skills",
        description: "Open the skills section",
        icon: <Sparkles size={16} />,
        action: () => goToSection("#skills"),
      },
      {
        id: "projects",
        label: "Jump to projects",
        description: "Open the featured projects section",
        icon: <Sparkles size={16} />,
        action: () => goToSection("#projects"),
      },
      {
        id: "experience",
        label: "Jump to experience",
        description: "Open the experience timeline",
        icon: <Sparkles size={16} />,
        action: () => goToSection("#experience"),
      },
      {
        id: "testimonials",
        label: "Jump to testimonials",
        description: "Open the testimonials section",
        icon: <Sparkles size={16} />,
        action: () => goToSection("#testimonials"),
      },
      {
        id: "contact",
        label: "Contact me",
        description: "Open the contact modal",
        icon: <Mail size={16} />,
        action: () => {
          onOpenContact();
        },
      },
      {
        id: "email",
        label: "Copy email",
        description: `Copy ${siteConfig.owner.email}`,
        icon: <Mail size={16} />,
        action: () => {
          void copyEmail();
        },
      },
      {
        id: "theme",
        label:
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        description: "Toggle the visual theme",
        icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
        action: () => {
          setTheme(theme === "dark" ? "light" : "dark");
        },
      },
    ];
  }, [onOpenContact, setTheme, theme]);

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.description}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [commands, query]);

  const handleSelect = (action: () => void) => {
    action();
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-20 sm:pt-28 backdrop-blur-md"
          style={{ background: "rgba(0, 0, 0, 0.45)" }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-[1.5rem] border shadow-[0_20px_80px_rgba(0,0,0,0.22)]"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border-strong)",
            }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              className="flex items-center gap-3 border-b px-4 py-3"
              style={{ borderColor: "var(--border-strong)" }}
            >
              <Search size={18} style={{ color: "var(--text-muted)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands or sections"
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)" }}
              />
              <span
                className="rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{
                  borderColor: "var(--border-strong)",
                  color: "var(--text-muted)",
                }}
              >
                Esc
              </span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
              {filteredCommands.length === 0 ? (
                <div
                  className="px-3 py-5 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  No matching commands.
                </div>
              ) : (
                filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => handleSelect(command.action)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors duration-200 hover:bg-[var(--bg-subtle)]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full border"
                        style={{
                          borderColor: "var(--border-strong)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {command.icon}
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {command.label}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {command.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[11px] uppercase tracking-[0.24em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Enter
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
