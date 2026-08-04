import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";
import { TagList } from "@/components/sections/Projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${siteConfig.seo.title}`,
    description: project.longDescription,
    openGraph: {
      title: `${project.title} | ${siteConfig.seo.title}`,
      description: project.longDescription,
      images: [project.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.seo.title}`,
      description: project.longDescription,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return notFound();

  const { projectPage } = content;

  return (
    <main
      className="min-h-screen px-6 py-12 sm:px-12 md:px-20 lg:px-32"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Link
          href="/#projects"
          className="w-fit text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline"
          style={{ color: "var(--text-secondary)" }}
        >
          {projectPage.backLabel}
        </Link>

        {/* Hero Card */}
        <section
          className="overflow-hidden rounded-[2rem] border shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border-strong)",
          }}
        >
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                {projectPage.sectionLabel}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p
                className="mt-5 max-w-2xl text-[15px] leading-7 sm:text-[16px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.longDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <TagList tags={project.tags} full />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "var(--text-primary)",
                    color: "var(--bg)",
                  }}
                >
                  Live project <ArrowUpRight size={16} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-medium transition-colors duration-300 hover:bg-[var(--bg-subtle)]"
                  style={{
                    borderColor: "var(--border-strong)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Github size={16} /> Source code
                </a>
              </div>
            </div>

            <div
              className="border-t p-4 sm:p-6 lg:border-t-0 lg:border-l"
              style={{ borderColor: "var(--border-strong)" }}
            >
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Highlights */}
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="rounded-[1.5rem] border p-6 sm:p-8"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border-strong)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Overview
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {projectPage.overviewTitle}
            </h2>
            <p
              className="mt-4 text-[15px] leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.longDescription}
            </p>
          </div>

          <div
            className="rounded-[1.5rem] border p-6 sm:p-8"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border-strong)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              {projectPage.highlightsTitle}
            </p>
            {project.highlights && project.highlights.length > 0 ? (
              <ul
                className="mt-4 space-y-3 text-[15px] leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.highlights.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            ) : (
              <p
                className="mt-4 text-[15px] leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
