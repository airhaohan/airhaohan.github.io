/**
 * Blog Page — Frutiger Aero Classic Revival
 * Displays list of blog posts with tags, reading time, and date
 */

import { useState } from "react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { BookOpen, Clock, Tag, ChevronRight, Search } from "lucide-react";

// Collect all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap(p => p.tags)));

function PostCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className="glass-card transition-all duration-300 cursor-pointer"
        style={{ padding: "1.5rem" }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 16px 48px rgba(10,79,140,0.35), 0 2px 8px rgba(255,255,255,0.12) inset";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "";
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "white",
              lineHeight: 1.4,
            }}
          >
            {post.title}
          </h2>
          <ChevronRight
            size={18}
            style={{ color: "rgba(74,173,232,0.7)", flexShrink: 0, marginTop: "2px" }}
          />
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          {post.description}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <span key={tag} className="tag-aero">
                <Tag size={10} style={{ marginRight: "3px" }} />
                {tag}
              </span>
            ))}
          </div>

          <div
            className="flex items-center gap-3"
            style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
          >
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime} min read
            </span>
            <span>{post.date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "3rem" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Header */}
        <div className="fade-in-up" style={{ marginBottom: "2rem" }}>
          <h1
            className="heading-aero"
            style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
          >
            <BookOpen size={28} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
            Blog
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            Technical writings on AI systems, mobile inference, and research insights.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="glass-card fade-in-up delay-100" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "0.875rem",
                fontFamily: "'Source Sans 3', sans-serif",
                width: "100%",
              }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag(null)}
              className="tag-aero"
              style={{
                cursor: "pointer",
                background: !selectedTag ? "rgba(74,173,232,0.4)" : undefined,
                border: !selectedTag ? "1px solid rgba(74,173,232,0.7)" : undefined,
              }}
            >
              All ({blogPosts.length})
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className="tag-aero"
                style={{
                  cursor: "pointer",
                  background: selectedTag === tag ? "rgba(74,173,232,0.4)" : undefined,
                  border: selectedTag === tag ? "1px solid rgba(74,173,232,0.7)" : undefined,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <div
                key={post.slug}
                className="fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <div
              className="glass-card text-center"
              style={{ padding: "3rem", color: "rgba(255,255,255,0.5)" }}
            >
              <BookOpen size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                No posts found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
