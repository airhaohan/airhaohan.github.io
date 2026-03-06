/**
 * Home Page — Frutiger Aero Classic Revival
 * Layout: Fixed sidebar (Profile) + Main content (About, Education, News)
 */

import { useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { aboutContent, educationData, newsData } from "@/data/homeContent";
import { siteConfig } from "@/lib/siteConfig";
import {
  User,
  GraduationCap,
  Newspaper,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// ─── About Section ────────────────────────────────────────────────
function AboutSection() {
  // Convert markdown-like bold to JSX
  const renderContent = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: "#7DD3FC", fontWeight: 700 }}>{part}</strong>
        : part
    );
  };

  const paragraphs = aboutContent.trim().split("\n\n").filter(Boolean);

  return (
    <section className="glass-card fade-in-up" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
      <h2 className="section-heading">
        <User size={18} style={{ color: "#4AADE8" }} />
        About Me
      </h2>
      <div className="prose-aero">
        {paragraphs.map((para, i) => (
          <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? "1rem" : 0 }}>
            {renderContent(para.trim())}
          </p>
        ))}
      </div>

      {/* Hero background image */}
      <div
        className="mt-5 rounded-2xl overflow-hidden"
        style={{
          height: "180px",
          position: "relative",
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663390406453/2PXXNudgYMhfsiCvNQBYed/hero-bg-32Te6FGvxvAfJHjhB2CggG.webp"
          alt="Frutiger Aero background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(10,40,80,0.7) 0%, transparent 60%)",
            display: "flex",
            alignItems: "center",
            padding: "1.5rem",
          }}
        >
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "white", marginBottom: "0.25rem" }}>
              AI Infra · ML Systems · Mobile Inference
            </p>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
              Making AI accessible on every device
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education Section ────────────────────────────────────────────
function EducationSection() {
  return (
    <section className="glass-card fade-in-up delay-100" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
      <h2 className="section-heading">
        <GraduationCap size={18} style={{ color: "#4AADE8" }} />
        Education
      </h2>

      <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
        {/* Timeline line */}
        <div className="timeline-line" />

        {educationData.map((edu, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              marginBottom: i < educationData.length - 1 ? "1.75rem" : 0,
            }}
          >
            {/* Timeline dot */}
            <div
              className={`timeline-dot ${edu.current ? "current" : ""}`}
              style={{
                position: "absolute",
                left: "-2rem",
                top: "0.35rem",
              }}
            />

            <div
              className="rounded-xl p-3.5 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h3
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "white",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#7DD3FC", fontWeight: 600 }}>
                    {edu.school}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: edu.current ? "#86EFAC" : "rgba(255,255,255,0.5)",
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    background: edu.current ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
                    border: `1px solid ${edu.current ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.15)"}`,
                    borderRadius: "2rem",
                    padding: "0.15rem 0.6rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {edu.current && "🎓 "}{edu.period}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginTop: "0.4rem", lineHeight: 1.5 }}>
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── News Section ─────────────────────────────────────────────────
function NewsSection() {
  const [expanded, setExpanded] = useState(false);
  const displayedNews = expanded ? newsData : newsData.slice(0, 4);

  const renderContent = (text: string) => {
    // 1. First, split by markdown links: [text](url)
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index);
      if (before) {
        result.push(...renderBold(before));
      }

      const [_, linkText, linkUrl] = match;
      result.push(
        <a 
          key={`link-${match.index}`} 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "#7DD3FC", fontWeight: 700, textDecoration: "underline" }}
        >
          {linkText}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    const after = text.slice(lastIndex);
    if (after) {
      result.push(...renderBold(after));
    }

    return result.length > 0 ? result : renderBold(text);
  };

  const renderBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={`bold-${i}`} style={{ color: "#7DD3FC", fontWeight: 700 }}>{part}</strong>
        : part
    );
  };

  return (
    <section className="glass-card fade-in-up delay-200" style={{ padding: "1.75rem" }}>
      <h2 className="section-heading">
        <Newspaper size={18} style={{ color: "#4AADE8" }} />
        News
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 600,
          }}
        >
          {newsData.length} updates
        </span>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {displayedNews.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl p-3 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                color: "#4AADE8",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                background: "rgba(74,173,232,0.15)",
                border: "1px solid rgba(74,173,232,0.3)",
                borderRadius: "0.5rem",
                padding: "0.2rem 0.5rem",
                whiteSpace: "nowrap",
                marginTop: "0.1rem",
                flexShrink: 0,
              }}
            >
              {item.date}
            </span>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
              {renderContent(item.content)}
            </p>
          </div>
        ))}
      </div>

      {newsData.length > 4 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-sm font-bold transition-all duration-200"
          style={{
            color: "#4AADE8",
            background: "none",
            border: "none",
            fontFamily: "'Nunito', sans-serif",
            cursor: "pointer",
          }}
        >
          <ChevronRight
            size={16}
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
          {expanded ? "Show less" : `Show ${newsData.length - 4} more`}
        </button>
      )}
    </section>
  );
}

// ─── Main Home Page ───────────────────────────────────────────────
export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <AboutSection />
            <EducationSection />
            <NewsSection />
          </main>
        </div>
      </div>
    </div>
  );
}
