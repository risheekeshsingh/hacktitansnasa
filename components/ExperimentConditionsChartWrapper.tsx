"use client";

import dynamic from "next/dynamic";
import type { Experiment } from "@/types";

const ExperimentConditionsChartDynamic = dynamic(
  () => import("@/components/ExperimentConditionsChart").then((m) => m.ExperimentConditionsChart),
  {
    ssr: false,
    loading: () => <div className="h-[260px] rounded-xl border border-white/10 bg-white/5 animate-pulse" />,
  }
);

export function ExperimentConditionsChartWrapper({ experiment }: { experiment: Experiment }) {
  return <ExperimentConditionsChartDynamic experiment={experiment} />;
}
