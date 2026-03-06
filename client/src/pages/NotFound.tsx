/**
 * NotFound (404) Page — Frutiger Aero Classic Revival
 */

import { Link } from "wouter";
import { Home, Waves } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <div className="glass-card text-center fade-in-up" style={{ padding: "3.5rem 4rem", maxWidth: "480px" }}>
        <div
          style={{
            fontSize: "5rem",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            background: "linear-gradient(135deg, #4AADE8, #0B8C6E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          404
        </div>

        <Waves
          size={48}
          style={{ color: "rgba(74,173,232,0.5)", margin: "1rem auto" }}
        />

        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "white",
            marginBottom: "0.75rem",
          }}
        >
          Page Not Found
        </h2>

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.6 }}>
          The page you're looking for seems to have drifted away like a bubble in the Frutiger Aero sky.
        </p>

        <Link href="/">
          <button className="aero-btn flex items-center gap-2 mx-auto px-6 py-2.5">
            <Home size={16} />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
