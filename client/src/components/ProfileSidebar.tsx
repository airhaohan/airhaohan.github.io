/**
 * ProfileSidebar — Frutiger Aero glass profile card
 * Displays avatar, name, affiliation, status, and social links
 */

import { siteConfig } from "@/lib/siteConfig";
import {
  Mail,
  MapPin,
  Github,
  ExternalLink,
  GraduationCap,
  Microscope,
  Youtube,
} from "lucide-react";

// Bilibili icon (custom SVG)
function BilibiliIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
    </svg>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200"
      style={{
        color: "rgba(255,255,255,0.8)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 600,
        textDecoration: "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export default function ProfileSidebar() {
  return (
    <aside
      className="glass-card fade-in-up"
      style={{
        width: "280px",
        flexShrink: 0,
        padding: "1.5rem",
        alignSelf: "flex-start",
        position: "sticky",
        top: "80px",
      }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-5">
        <div
          className="relative mb-3"
          style={{
            width: "100px",
            height: "100px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4AADE8 0%, #0B8C6E 100%)",
              padding: "3px",
              boxShadow: "0 4px 20px rgba(74,173,232,0.5), 0 0 0 2px rgba(255,255,255,0.3)",
            }}
          >
            <img
              src={siteConfig.avatar}
              alt={siteConfig.fullName}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                background: "white",
              }}
            />
          </div>
          {/* Status indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              right: "4px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#22C55E",
              border: "2px solid rgba(255,255,255,0.8)",
              boxShadow: "0 0 6px rgba(34,197,94,0.6)",
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "white",
            marginBottom: "0.2rem",
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          {siteConfig.fullName}
        </h1>

        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 600,
          }}
        >
          {siteConfig.title}
        </p>

        {/* Status badge */}
        <div
          className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: "rgba(34,197,94,0.2)",
            border: "1px solid rgba(34,197,94,0.4)",
            color: "#86EFAC",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {siteConfig.status}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "1rem" }} />

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <Microscope size={14} style={{ color: "rgba(74,173,232,0.9)", marginTop: "3px", flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
            {siteConfig.affiliation}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={14} style={{ color: "rgba(74,173,232,0.9)", marginTop: "3px", flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
            {siteConfig.address}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={14} style={{ color: "rgba(74,173,232,0.9)", marginTop: "3px", flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
            {siteConfig.address1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={14} style={{ color: "rgba(74,173,232,0.9)", flexShrink: 0 }} />
          <a
            href={`mailto:${siteConfig.email}`}
            style={{ fontSize: "0.82rem", color: "rgba(74,173,232,0.9)", textDecoration: "none" }}
          >
            {siteConfig.email}
          </a>
        </div>
      </div>

      {/* Research Interests */}
      <div className="mb-4">
        <p
          style={{
            fontSize: "0.75rem",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          Research Interests
        </p>
        <div className="flex flex-wrap gap-1.5">
          {siteConfig.research.interests.map(interest => (
            <span key={interest} className="tag-aero" style={{ fontSize: "0.7rem" }}>
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "1rem" }} />

      {/* Social Links */}
      <div className="flex flex-col gap-2">
        {siteConfig.social.github && (
          <SocialLink
            href={siteConfig.social.github}
            icon={<Github size={14} />}
            label="GitHub"
          />
        )}
        {siteConfig.social.googleScholar && (
          <SocialLink
            href={siteConfig.social.googleScholar}
            icon={<GraduationCap size={14} />}
            label="Google Scholar"
          />
        )}
        {siteConfig.social.bilibili && (
          <SocialLink
            href={siteConfig.social.bilibili}
            icon={<BilibiliIcon size={14} />}
            label="Bilibili · 我是小小升"
          />
        )}
      </div>
    </aside>
  );
}
