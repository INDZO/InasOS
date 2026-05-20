"use client";

import { useDesktopStore } from "@/store/useDesktopStore";

export default function DesktopWallpaper() {
  const wallpaperIntensity = useDesktopStore((s) => s.wallpaperIntensity);
  // Higher intensity keeps the wallpaper bright; lower intensity dims it so
  // windows stay readable. Capped so the wallpaper never fully disappears.
  const dimOpacity = ((100 - wallpaperIntensity) / 100) * 0.82;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 os-wallpaper" />
      <div className="absolute inset-0 os-grid opacity-30" />
      <div
        className="absolute inset-0 bg-black transition-opacity duration-200"
        style={{ opacity: dimOpacity }}
      />
      <div className="absolute inset-0 os-noise pointer-events-none" />
    </div>
  );
}
