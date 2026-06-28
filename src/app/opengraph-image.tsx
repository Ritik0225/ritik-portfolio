import { ImageResponse } from "next/og";
import { personal } from "@/data";

export const runtime = "edge";
export const alt = `${personal.name} — ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.18), transparent 60%), linear-gradient(135deg, #070B14 0%, #0B1220 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {personal.shortName.charAt(0)}
          </div>
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            color: "#22D3EE",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {personal.role}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            marginTop: 16,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {personal.name}
        </div>
        <div
          style={{
            fontSize: 38,
            marginTop: 24,
            color: "#cbd5e1",
            fontWeight: 500,
            maxWidth: 980,
          }}
        >
          {personal.tagline}
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 32,
            color: "#94a3b8",
            fontFamily: "monospace",
          }}
        >
          MERN · Shopify · Next.js · TypeScript
        </div>
      </div>
    ),
    size,
  );
}
