"use client";

import dynamic from "next/dynamic";

const FlameSimulator2DDynamic = dynamic(
  () => import("@/components/safety/FlameSimulator2D").then((m) => m.FlameSimulator2D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[460px] rounded-2xl border border-space-800 bg-space-900/60 animate-pulse" />
    ),
  }
);

export function FlameSimulator2DWrapper() {
  return <FlameSimulator2DDynamic />;
}
