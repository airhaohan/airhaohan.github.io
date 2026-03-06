/**
 * BlogPost Page — Frutiger Aero Classic Revival
 * Renders individual blog post with KaTeX math support
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { renderMarkdown } from "@/lib/markdownRenderer";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";

interface BlogPostProps {
  params: { slug: string };
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  const renderedContent = useMemo(() => {
    if (!post) return "";
    return renderMarkdown(post.content);
  }, [post]);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-card text-center" style={{ padding: "3rem" }}>
          <p style={{ color: "white", fontSize: "1.2rem", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            Post not found
          </p>
          <Link href="/blog">
            <span style={{ color: "#4AADE8", cursor: "pointer", marginTop: "1rem", display: "block" }}>
              ← Back to Blog
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "3rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Back button */}
        <Link href="/blog">
          <div
            className="flex items-center gap-2 mb-6 fade-in-up"
            style={{
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              width: "fit-content",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </div>
        </Link>

        {/* Article */}
        <article className="glass-card fade-in-up delay-100" style={{ padding: "2.5rem" }}>
          {/* Header */}
          <header style={{ marginBottom: "2rem" }}>
            <h1
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "1.8rem",
                color: "white",
                lineHeight: 1.3,
                marginBottom: "1rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-1.5"
                style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
              >
                <Calendar size={13} />
                {post.date}
              </div>
              <div
                className="flex items-center gap-1.5"
                style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
              >
                <Clock size={13} />
                {post.readingTime} min read
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map(tag => (
                <span key={tag} className="tag-aero">
                  <Tag size={10} style={{ marginRight: "3px" }} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              style={{
                marginTop: "1.25rem",
                padding: "0.75rem 1rem",
                background: "rgba(74,173,232,0.1)",
                border: "1px solid rgba(74,173,232,0.25)",
                borderLeft: "3px solid rgba(74,173,232,0.7)",
                borderRadius: "0 0.75rem 0.75rem 0",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.75)",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              {post.description}
            </p>
          </header>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "2rem" }} />

          {/* Content */}
          <div
            className="prose-aero"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
        </article>

        {/* Navigation to other posts */}
        <div className="glass-card fade-in-up delay-200 mt-4" style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            More Posts
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 3)
              .map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <div
                    className="flex items-center justify-between rounded-xl px-3 py-2 transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
                  >
                    <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>{p.title}</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{p.date}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
