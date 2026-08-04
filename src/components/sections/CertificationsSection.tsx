// components/sections/CertificationsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { certifications, type Certification } from "@/data/certifications";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { fadeInUp, staggerContainer, springSnappy } from "@/lib/motion";

const cardHover =
  "transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--text-muted)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]";

const formatMonthYear = (value: string): string => {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const isExpired = (expiry?: string): boolean => {
  if (!expiry) return false;
  const [year, month] = expiry.split("-").map(Number);
  if (!year || !month) return false;
  return new Date(year, month) < new Date();
};

const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => {
  const expired = isExpired(cert.expiryDate);

  const Card = (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3, scale: 1.015 }}
      transition={springSnappy}
      className={`surface-card p-5 md:p-6 rounded-[1.5rem] border border-[var(--border-strong)] bg-[var(--bg-elevated)] flex items-start gap-4 group relative ${cardHover} ${
        cert.credentialUrl ? "cursor-pointer" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem] pointer-events-none" />

      {cert.issuerLogo ? (
        <div className="shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <Image
            src={cert.issuerLogo}
            alt={`${cert.issuer} logo`}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="text-[11px] font-semibold uppercase text-[var(--text-muted)]">
            {cert.issuer.slice(0, 2)}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm md:text-base font-semibold text-[var(--text-primary)] leading-snug transition-colors group-hover:text-cyan-400 dark:group-hover:text-cyan-300">
            {cert.title}
          </h4>
          {cert.credentialUrl && (
            <svg
              className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </div>

        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {cert.issuer}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
            {formatMonthYear(cert.issueDate)}
            {cert.expiryDate && ` – ${formatMonthYear(cert.expiryDate)}`}
          </span>
          {expired && (
            <span className="badge badge-error text-[9px]">EXPIRED</span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (!cert.credentialUrl) return Card;

  return (
    <a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] rounded-[1.5rem]"
      aria-label={`Verify ${cert.title} credential (opens in new tab)`}
    >
      {Card}
    </a>
  );
};

const CertificationsSection: React.FC = () => {
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="w-full py-12 md:py-16 lg:py-20 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)]"
      aria-labelledby="certs-heading"
    >
      <BackgroundFX
        bloomColor="primary"
        bloomPosition="top-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%]"
        pattern="grid"
        textureOpacity="medium"
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 lg:mb-20 text-left"
        >
          <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 md:mb-6">
            {content.sections.certifications.label}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="certs-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.1] text-[var(--text-primary)]"
            >
              {content.sections.certifications.title}
            </h2>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)] font-mono">
              {certifications.length} credential
              {certifications.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {certifications.map((cert) => (
            <CertificationCard
              key={`${cert.title}-${cert.issuer}`}
              cert={cert}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
