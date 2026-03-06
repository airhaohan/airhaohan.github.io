/**
 * BubbleBackground — Frutiger Aero floating bubble animation
 * Creates CSS-animated glass bubbles floating across the background
 */

import { useMemo } from "react";

interface BubbleProps {
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

function Bubble({ size, left, delay, duration, opacity }: BubbleProps) {
  return (
    <div
      className="bubble"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        bottom: "-100px",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity,
      }}
    />
  );
}

export default function BubbleBackground() {
  const bubbles = useMemo<BubbleProps[]>(() => [
    { size: 80, left: 5, delay: 0, duration: 14, opacity: 0.35 },
    { size: 45, left: 12, delay: 3, duration: 11, opacity: 0.3 },
    { size: 120, left: 22, delay: 1.5, duration: 18, opacity: 0.25 },
    { size: 30, left: 35, delay: 5, duration: 9, opacity: 0.4 },
    { size: 65, left: 48, delay: 2, duration: 13, opacity: 0.3 },
    { size: 95, left: 58, delay: 7, duration: 16, opacity: 0.22 },
    { size: 40, left: 68, delay: 0.5, duration: 10, opacity: 0.38 },
    { size: 75, left: 78, delay: 4, duration: 15, opacity: 0.28 },
    { size: 55, left: 88, delay: 6, duration: 12, opacity: 0.33 },
    { size: 110, left: 93, delay: 2.5, duration: 20, opacity: 0.2 },
    { size: 35, left: 15, delay: 8, duration: 8, opacity: 0.45 },
    { size: 50, left: 42, delay: 9, duration: 11, opacity: 0.32 },
  ], []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {bubbles.map((bubble, i) => (
        <Bubble key={i} {...bubble} />
      ))}
    </div>
  );
}
