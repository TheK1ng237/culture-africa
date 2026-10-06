import { ImageResponse } from "next/og";

export const alt = "Culture Africa — L’Afrique. Mille histoires. Une identité.";
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
          padding: 72,
          background: "linear-gradient(160deg, #110d0a 30%, #8a2f1f 100%)",
          color: "#f6f0e4",
        }}
      >
        <div style={{ fontSize: 34, color: "#c9a24d" }}>Culture Africa</div>
        <div style={{ fontSize: 84, lineHeight: 1.05, marginTop: 16 }}>L’Afrique. Mille histoires. Une identité.</div>
      </div>
    ),
    size,
  );
}
