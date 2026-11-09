import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = profile.name + " — " + profile.role;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0b1120", color: "#f8fafc", padding: 66, flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 52, height: 52, alignItems: "center", justifyContent: "center", border: "1px solid #fb923c", borderRadius: 14, color: "#fb923c", fontSize: 24 }}>IH</div>
            <div style={{ display: "flex", fontSize: 24, color: "#cbd5e1" }}>InasOS / Portfolio</div>
          </div>
          <div style={{ display: "flex", fontSize: 18, color: "#94a3b8" }}>REACT · ASP.NET CORE · C# · SQL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, letterSpacing: -4 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 32, color: "#fb923c" }}>{profile.role}</div>
          <div style={{ display: "flex", maxWidth: 900, fontSize: 25, lineHeight: 1.5, color: "#cbd5e1" }}>Client delivery, full-stack university projects and interactive work.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #334155", paddingTop: 24 }}>
          <div style={{ display: "flex", fontSize: 20, color: "#94a3b8" }}>hamzagicinas.vercel.app</div>
          <div style={{ display: "flex", fontSize: 20, color: "#fb923c" }}>Explore the portfolio ↗</div>
        </div>
      </div>
    ),
    size,
  );
}
