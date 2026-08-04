// components/sections/CertificationsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications, type Certification } from "@/data/certifications";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { fadeInUp, springSnappy } from "@/lib/motion";

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

const StatusBadge: React.FC<{ expired: boolean }> = ({ expired }) => (
  <span
    className={`inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors duration-300 ${
      expired
        ? "bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400"
        : "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
    }`}
  >
    {expired ? "Expired" : "Active"}
  </span>
);

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const expired = isExpired(cert.expiryDate);

  const innerContent = (
    <>
      {/* Top Header Row: Emblem, Title, Verified Check & External Link Action */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 p-2.5">
            {cert.issuerLogo ? (
              <Image
                src={cert.issuerLogo}
                alt={`${cert.issuer} logo`}
                width={36}
                height={36}
                className="object-contain"
              />
            ) : (
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">
                {cert.issuer.slice(0, 2)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h4 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] leading-snug truncate group-hover:text-[var(--text-primary)] transition-colors duration-300">
                {cert.title}
              </h4>
              {cert.credentialUrl && (
                <span
                  title="Verified Credential (Official Link)"
                  className="shrink-0 inline-flex items-center justify-center drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                >
                  <BadgeCheck className="w-5 h-5 text-white dark:text-zinc-950 fill-emerald-500 dark:fill-emerald-400" />
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mt-1">
              {cert.issuer}
            </p>
          </div>
        </div>

        {cert.credentialUrl && (
          <div className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex items-center justify-center shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-muted)] transition-all duration-300">
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </div>

      {/* Bottom Row: Timestamp & Active/Expired Status Badge */}
      <div className="mt-8 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="font-mono text-[11px] font-medium text-[var(--text-muted)] tracking-wider">
          <span>Issued {formatMonthYear(cert.issueDate)}</span>
          {cert.expiryDate && <span> \u2192 {expired ? "Expired" : "Valid until"} {formatMonthYear(cert.expiryDate)}</span>}
        </div>

        <StatusBadge expired={expired} />
      </div>
    </>
  );

  const containerClasses = `group relative rounded-[1.5rem] p-6 md:p-7 transition-all duration-500 border bg-[var(--bg-elevated)] border-[var(--border-strong)] hover:border-[var(--text-muted)] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] flex flex-col justify-between h-full`;

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    whileHover: { y: -4 },
    transition: { ...springSnappy, delay: index * 0.1 },
  };

  if (cert.credentialUrl) {
    return (
      <motion.a
        {...motionProps}
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${containerClasses} cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-muted)]`}
        aria-label={`Verify ${cert.title} credential on ${cert.issuer} (opens in new tab)`}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps} className={containerClasses}>
      {innerContent}
    </motion.div>
  );
};

const CertificationsSection: React.FC = () => {
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="w-full py-16 md:py-24 lg:py-32 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)]"
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
          <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 md:mb-6">
            {content.sections.certifications.label}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="certs-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.08] text-[var(--text-primary)]"
            >
              {content.sections.certifications.title}
            </h2>
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono font-semibold">
              {certifications.length} Verified Credential{certifications.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {certifications.map((cert, index) => (
            <CertificationCard key={`${cert.title}-${cert.issuer}`} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;


