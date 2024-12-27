import { ImageResponse } from "next/og";

import siteConfig from "../../../site.config";

// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          color: "black",
          background: siteConfig.colorBackground,
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {siteConfig.icon + " " + siteConfig.dateIcon}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent' and 'fluentFlat'
      // Default to 'twemoji'
      emoji: "twemoji",
    },
  );
}
