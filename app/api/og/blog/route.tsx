import { type NextApiRequest, type NextApiResponse } from "next";
import { parsePageId } from "notion-utils";

import { ImageResponse } from "next/og";

import { getSocialImageUrl } from "../../../../lib/notion_client/getSocialImageUrl";

export async function GET(req, { params }) {
  const pageId = req.nextUrl.searchParams.get("id");
  if (!pageId) {
    return new Response("Invalid notion page id", { status: 400 });
  }

  const url = await getSocialImageUrl(pageId);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1F2027",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <img
          src={url}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // TODO: satori doesn't support background-size: cover and seems to
            // have inconsistent support for filter + transform to get rid of the
            // blurred edges. For now, we'll go without a blur filter on the
            // background, but Satori is still very new, so hopefully we can re-add
            // the blur soon.

            // backgroundImage: pageInfo.image
            //   ? `url(${pageInfo.image})`
            //   : undefined,
            // backgroundSize: '100% 100%'
            // TODO: pageInfo.imageObjectPosition
            // filter: 'blur(8px)'
            // transform: 'scale(1.05)'
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
