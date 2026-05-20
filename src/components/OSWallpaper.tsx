"use client";

import { useDesktopStore } from "@/store/useDesktopStore";

/**
 * Shared InasOS wallpaper used by both DesktopOS and MobileOS.
 * An illustrated SVG image is the wallpaper; the vignette and noise add depth,
 * and wallpaper intensity (0-100) dims the image without ever hiding it.
 */
export default function OSWallpaper() {
  const intensity = useDesktopStore((s) => s.wallpaperIntensity);
  const dimOpacity = ((100 - intensity) / 100) * 0.62;

  return (
    <div className="os-wallpaper-base absolute inset-0 -z-10 overflow-hidden">
      <div className="os-wallpaper-vignette absolute inset-0" />
      <div className="os-noise absolute inset-0 opacity-30" />
      <div
        className="absolute inset-0 bg-[#03060e] transition-opacity duration-200"
        style={{ opacity: dimOpacity }}
      />
    </div>
  );
}
