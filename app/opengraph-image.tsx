import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export const alt = site.ogImage.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colores del portafolio (app/globals.css) y del escritorio retro.
const page = "#e6e8e7";
const ink = "#252a28";
const accent = "#a94820";
const retroWindow = "#c8c8c8";
const retroTitle = "#000080";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: page,
          color: ink,
        }}
      >
        <div
          style={{
            width: 1000,
            display: "flex",
            flexDirection: "column",
            background: retroWindow,
            border: "4px solid #000000",
            boxShadow: `12px 12px 0 ${accent}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 56,
              padding: "0 20px",
              background: retroTitle,
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            <span>{site.ogImage.windowTitle}</span>
            <span style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 28, height: 28, background: retroWindow }} />
              <span style={{ width: 28, height: 28, background: retroWindow }} />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "56px 64px 64px",
            }}
          >
            <div
              style={{
                fontSize: 112,
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 1.05,
              }}
            >
              {profile.name}
            </div>
            <div style={{ marginTop: 20, fontSize: 44, color: accent }}>
              {site.ogImage.subtitle}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
