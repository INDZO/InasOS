"use client";

import { useDesktopStore } from "@/store/useDesktopStore";

/**
 * Shared InasOS wallpaper used by both DesktopOS and MobileOS.
 * The navy base layer is always fully painted, so the background is never a
 * flat black screen. The glow, accent and grid layers are driven by wallpaper
 * intensity (0-100) and stay clearly visible even at the lowest setting.
 */
export default function OSWallpaper() {
  const intensity = useDesktopStore((s) => s.wallpaperIntensity);
  const factor = intensity / 100;
  const glowOpacity = 0.45 + 0.55 * factor;
  const accentOpacity = 0.4 + 0.6 * factor;
  const gridOpacity = 0.32 + 0.68 * factor;

  return (
    <div className="os-wallpaper-base absolute inset-0 -z-10 overflow-hidden">
      <div
        className="os-wallpaper-glow absolute inset-0 transition-opacity duration-200"
        style={{ opacity: glowOpacity }}
      />
      <div
        className="os-wallpaper-accent absolute inset-0 transition-opacity duration-200"
        style={{ opacity: accentOpacity }}
      />
      <div
        className="os-wallpaper-grid absolute inset-0 transition-opacity duration-200"
        style={{ opacity: gridOpacity }}
      />
      <div className="os-wallpaper-vignette absolute inset-0" />
      <div className="os-noise absolute inset-0 opacity-40" />
    </div>
  );
}
