/**
 * Videos Page — Frutiger Aero Classic Revival
 * Displays Bilibili video list with embedded player support
 */

import { useState } from "react";
import videosData from "@/data/videos.json";
import { siteConfig } from "@/lib/siteConfig";
import { Video, Eye, Clock, Tag, X, Play, ExternalLink } from "lucide-react";

interface VideoItem {
  bvid: string;
  title: string;
  description: string;
  cover: string;
  pubdate: string;
  duration: string;
  view: number;
  tags: string[];
}

function BilibiliEmbed({ bvid, onClose }: { bvid: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: "min(90vw, 900px)",
          padding: "1.25rem",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-1.5 transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "white",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "0.75rem" }}>
          <iframe
            src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "0.75rem",
            }}
            allowFullScreen
            allow="autoplay; fullscreen"
            title="Bilibili Video Player"
          />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, onPlay }: { video: VideoItem; onPlay: () => void }) {
  const formatViews = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

  return (
    <div
      className="glass-card transition-all duration-300"
      style={{ overflow: "hidden" }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          background: "linear-gradient(135deg, rgba(10,79,140,0.6), rgba(11,140,110,0.6))",
          backgroundImage: video.cover ? `url(${video.cover})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
        onClick={onPlay}
      >
        {/* Gradient Overlay for contrast */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: video.cover 
              ? "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))"
              : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            className="play-btn"
          >
            <Play size={24} style={{ color: "white", marginLeft: "3px" }} />
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 600,
            }}
          >
            Click to play
          </span>
        </div>

        {/* Duration badge */}
        <div
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0.5rem",
            background: "rgba(0,0,0,0.65)",
            color: "white",
            fontSize: "0.72rem",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            padding: "0.15rem 0.4rem",
            borderRadius: "0.35rem",
          }}
        >
          <Clock size={10} style={{ display: "inline", marginRight: "3px" }} />
          {video.duration}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1rem" }}>
        <h3
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "white",
            lineHeight: 1.4,
            marginBottom: "0.5rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.title}
        </h3>

        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            marginBottom: "0.75rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {video.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-aero" style={{ fontSize: "0.68rem" }}>
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-center justify-between"
          style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
        >
          <span className="flex items-center gap-1">
            <Eye size={11} />
            {formatViews(video.view)} views
          </span>
          <span>{video.pubdate}</span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={onPlay}
            className="aero-btn flex-1 flex items-center justify-center gap-1.5 py-2 text-sm"
          >
            <Play size={13} />
            Play
          </button>
          <a
            href={`https://www.bilibili.com/video/${video.bvid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="aero-btn flex items-center justify-center gap-1.5 px-3 py-2 text-sm"
            style={{ textDecoration: "none" }}
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videos = videosData as VideoItem[];

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "3rem" }}>
      {/* Bilibili embed modal */}
      {activeVideo && (
        <BilibiliEmbed
          bvid={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ marginBottom: "2rem" }}>
          <h1 className="heading-aero" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            <Video size={28} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
            Video Blog
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            Technical video tutorials and research sharing on{" "}
            <a
              href={siteConfig.social.bilibili}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4AADE8", textDecoration: "none" }}
            >
              Bilibili · {siteConfig.bilibiliName}
            </a>
          </p>
        </div>

        {/* Channel info card */}
        <div
          className="glass-card fade-in-up delay-100"
          style={{
            padding: "1.25rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00A1D6, #0B8C6E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "white", fontSize: "0.95rem" }}>
              {siteConfig.bilibiliName}
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
              UID: {siteConfig.bilibiliUid} · {videos.length} videos
            </p>
          </div>
          <a
            href={siteConfig.social.bilibili}
            target="_blank"
            rel="noopener noreferrer"
            className="aero-btn flex items-center gap-2 px-4 py-2 text-sm"
            style={{ textDecoration: "none" }}
          >
            <ExternalLink size={13} />
            Visit Channel
          </a>
        </div>

        {/* Video grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {videos.map((video, i) => (
            <div
              key={video.bvid}
              className="fade-in-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <VideoCard
                video={video}
                onPlay={() => setActiveVideo(video.bvid)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
