"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Radio, Box } from "lucide-react";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-space-950/80">
      <div className="w-16 h-16 rounded-full border-2 border-astro-cyan/30 border-t-astro-cyan animate-spin" />
    </div>
  ),
});

const PRIMARY_VIDEO_URL = "https://video-public.canva.com/VAF-73sv_T8/v/c1ba321ece.mp4";
const LOCAL_FALLBACK_URL = "/space-flame.mp4";

export default function HeroFlameIssScene() {
  const [viewMode, setViewMode] = useState<"video" | "3d">("video");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(PRIMARY_VIDEO_URL);
  const [hasWebGl, setHasWebGl] = useState(true);
  const [isOnScreen, setIsOnScreen] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to render 3D canvas only when on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Check WebGL availability for 3D tab
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGl(false);
      }
    } catch {
      setHasWebGl(false);
    }
  }, []);

  // Guarantee continuous, zero-error autoplay execution across all browsers
  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Autoplay policy prevented immediate playback; attach single-interaction listener
          console.log("Autoplay deferred by browser policy, awaiting interaction:", error);
          const handleInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
          };
          window.addEventListener("click", handleInteraction, { once: true });
          window.addEventListener("touchstart", handleInteraction, { once: true });
          window.addEventListener("keydown", handleInteraction, { once: true });
        });
    }
  }, []);

  // Initialize playback immediately when viewMode is video
  useEffect(() => {
    if (viewMode === "video") {
      playVideo();
    }
  }, [viewMode, videoSrc, playVideo]);

  // Handle visibility changes (resume continuous loop when user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && viewMode === "video" && videoRef.current) {
        if (videoRef.current.paused) {
          playVideo();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [viewMode, playVideo]);

  // Fallback handler if external URL encounters CORS or network hiccups
  const handleVideoError = () => {
    console.warn("Primary Canva video URL unreachable or blocked, seamlessly switching to local asset.");
    if (videoSrc !== LOCAL_FALLBACK_URL) {
      setVideoSrc(LOCAL_FALLBACK_URL);
      if (videoRef.current) {
        videoRef.current.load();
        playVideo();
      }
    }
  };

  // Continuous loop safety watchdog
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="group w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden relative border border-space-800 bg-space-950/90 backdrop-blur-md shadow-2xl transition-all"
    >
      {/* 1. CONTINUOUS ORBITAL VIDEO FEED (DEFAULT VIEW) */}
      {viewMode === "video" && (
        <div className="absolute inset-0 w-full h-full bg-space-950">
          {/* Subtle loading skeleton before first frame */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-space-950">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full border-2 border-astro-cyan/30 border-t-astro-cyan animate-spin mx-auto" />
                <p className="text-xs font-mono text-slate-400">Connecting to Continuous Orbital Stream...</p>
              </div>
            </div>
          )}

          {/* Continuous Autoplaying Looping HTML5 Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            tabIndex={-1}
            aria-hidden="true"
            aria-label="Continuous orbital Earth observation video in microgravity"
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlaying={() => setIsPlaying(true)}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className={`w-full h-full object-cover pointer-events-none select-none transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Transparent interaction shield & Vignette: intercepts mouse events so browser video hover overlay never triggers */}
          <div className="absolute inset-0 pointer-events-auto bg-gradient-to-t from-space-950/90 via-transparent to-space-950/70" />
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-space-950/40" />
        </div>
      )}

      {/* 2. 3D R3F MICROGRAVITY PHYSICS SIM (OPTIONAL TOGGLE) */}
      {viewMode === "3d" && (
        <div className="absolute inset-0 w-full h-full bg-space-950/80">
          {hasWebGl && isOnScreen ? (
            <Hero3DCanvas />
          ) : hasWebGl && !isOnScreen ? (
            <div className="w-full h-full bg-space-950/80" />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <div className="space-y-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-ember-500 to-astro-cyan mx-auto animate-pulse blur-sm" />
                <p className="text-xs font-mono text-slate-400">
                  WebGL acceleration offline &bull; Microgravity Flame Simulation Fallback
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. FLOATING HUD BADGE & STATUS HEADER (Exact match with original screenshot) */}
      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        {/* Left Live Indicator & Title */}
        <div className="flex items-center gap-2 bg-space-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-space-800 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-astro-cyan animate-pulse shadow-cyan-glow" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
            {viewMode === "video" ? "LIVE R3F MICROGRAVITY PHYSICS SIM" : "LIVE R3F MICROGRAVITY PHYSICS SIM"}
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-600" />
          <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-astro-cyan">
            {viewMode === "video" ? "CONTINUOUS STREAM" : "INTERACTIVE 3D"}
          </span>
        </div>

        {/* Right View Switcher Pills (Pointer events enabled) */}
        <div className="pointer-events-auto flex items-center gap-1 bg-space-950/80 backdrop-blur-md p-1 rounded-full border border-space-800 shadow-lg">
          <button
            type="button"
            onClick={() => setViewMode("video")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
              viewMode === "video"
                ? "bg-astro-cyan text-space-950 font-bold shadow-cyan-glow"
                : "text-slate-400 hover:text-white hover:bg-space-850"
            }`}
            title="Continuous Orbital Earth Observation Video"
          >
            <Radio className="w-3 h-3" />
            <span>Live Video</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
              viewMode === "3d"
                ? "bg-ember-500 text-white font-bold shadow-ember-glow"
                : "text-slate-400 hover:text-white hover:bg-space-850"
            }`}
            title="Interactive Three.js 3D Microgravity Physics Sim"
          >
            <Box className="w-3 h-3" />
            <span>3D Sim</span>
          </button>
        </div>
      </div>
    </div>
  );
}
