/**
 * Navbar — Frutiger Aero glassmorphism navigation bar
 * Fixed top navigation with glass effect and smooth active states
 */

import { Link, useLocation } from "wouter";
import { siteConfig } from "@/lib/siteConfig";
import {
  Home,
  BookOpen,
  Video,
  FileText,
  Mail,
  Github,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Videos", href: "/videos", icon: Video },
  { label: "Publications", href: "/publications", icon: FileText },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav
      className="nav-glass fixed top-0 left-0 right-0 z-50"
      style={{ height: "60px" }}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #4AADE8, #0B8C6E)",
                border: "2px solid rgba(255,255,255,0.5)",
                boxShadow: "0 2px 8px rgba(74,173,232,0.4)",
                color: "white",
              }}
            >
              {siteConfig.name.charAt(0).toUpperCase()}
            </div>
            <span
              className="font-bold text-white"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1.05rem",
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              {siteConfig.name}
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/" ? location === "/" : location.startsWith(href);
            return (
              <Link key={href} href={href}>
                <span className={`nav-link flex items-center gap-1.5 ${isActive ? "active" : ""}`}>
                  <Icon size={14} />
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-2">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link p-2"
              title="GitHub"
            >
              <Github size={16} />
            </a>
          )}
          {siteConfig.social.googleScholar && (
            <a
              href={siteConfig.social.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link p-2"
              title="Google Scholar"
            >
              <GraduationCap size={16} />
            </a>
          )}
          <a
            href={`mailto:${siteConfig.email}`}
            className="nav-link p-2"
            title="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-center gap-1 pb-2 px-4">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/" ? location === "/" : location.startsWith(href);
          return (
            <Link key={href} href={href}>
              <span className={`nav-link flex items-center gap-1 text-xs ${isActive ? "active" : ""}`}>
                <Icon size={12} />
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
