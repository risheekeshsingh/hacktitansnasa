"use client";

import dynamic from "next/dynamic";

export const ISSPartnershipDiagramDynamic = dynamic(
  () => import("@/components/agencies/ISSPartnershipDiagram").then((m) => m.ISSPartnershipDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] rounded-2xl border border-space-800 bg-space-900/60 animate-pulse" />
    ),
  }
);

export const CombustionTimelineDynamic = dynamic(
  () => import("@/components/agencies/CombustionTimeline").then((m) => m.CombustionTimeline),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] rounded-2xl border border-space-800 bg-space-900/60 animate-pulse" />
    ),
  }
);
