"use client";

import React, { memo, useEffect, useRef, useState } from "react";

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  label: string;
  description: string;
}

export const AnimatedCounter = memo(function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  durationMs = 1200,
  label,
  description,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setDisplayValue(value);
      return;
    }

    let rafId: number | null = null;
    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        setDisplayValue(Math.floor(progress * value));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [value, durationMs]);

  return (
    <div ref={rootRef} className="p-5 rounded-2xl border border-space-800 bg-space-900/60 backdrop-blur-md space-y-1">
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
        {label}
      </span>
      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-baseline gap-0.5">
        <span>{prefix}</span>
        <span className="text-amber-400">{displayValue}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
});
