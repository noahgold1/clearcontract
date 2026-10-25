import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ClearContract. A 34-word contract clause shrunk to one plain sentence: they own everything you make, even side projects.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#05080E";
const INK = "#F2F6FB";
const SIGNAL = "#4BA8FF";
const ICE = "#A9D4FF";

/* Same idea as the hero: rings closing in on one plain sentence, with the
   fine print it came from sitting small and grey above it. Satori only
   does flex, so the rings are bordered circles stacked absolutely. */
export default function OGImage() {
  const rings = [1100, 880, 680, 500, 340];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: "60px 72px", position: "relative",
          background: `radial-gradient(ellipse 70% 80% at 78% 50%, #0E2138 0%, ${NIGHT} 70%)`,
          fontFamily: "system-ui, sans-serif", overflow: "hidden",
        }}
      >
        {rings.map((d, i) => (
          <div
            key={d}
            style={{
              position: "absolute", width: d, height: d, left: 930 - d / 2, top: 315 - d / 2,
              borderRadius: "50%", border: `1px solid rgba(75,168,255,${0.1 + i * 0.07})`, display: "flex",
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#0B1522", border: "1px solid rgba(75,168,255,.45)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, padding: "0 7px" }}>
            <div style={{ width: 19, height: 3, borderRadius: 2, background: INK, display: "flex" }} />
            <div style={{ width: 13, height: 3, borderRadius: 2, background: "rgba(242,246,251,.55)", display: "flex" }} />
            <div style={{ width: 6, height: 3, borderRadius: 2, background: SIGNAL, display: "flex" }} />
          </div>
          <div style={{ fontSize: 23, fontWeight: 500, color: INK, display: "flex" }}>ClearContract</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
          <div style={{ fontSize: 19, lineHeight: 1.55, color: "rgba(242,246,251,.38)", display: "flex", marginBottom: 30 }}>
            Contractor hereby irrevocably assigns to Company all right, title and interest in and to any and all Work Product together with all intellectual property rights therein, whether conceived within or outside the scope hereof.
          </div>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.035em", color: INK, display: "flex" }}>
            They own everything you make, even side projects.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, fontSize: 21, fontFamily: "monospace", color: "rgba(242,246,251,.5)" }}>
            34 words <span style={{ color: ICE }}>to 8</span>
          </div>
          <div style={{ fontSize: 22, color: INK, display: "flex" }}>clrct.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
