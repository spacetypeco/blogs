import { Block } from "./types";

export default function mapVideoUrl(block: Block) {
  if (block.type != "video") {
    return;
  }

  const url = block.properties.source[0][0];

  if (!url.includes("prod-files-secure") || url.includes("signed")) {
    return;
  }

  const encodedUrl = encodeURIComponent(url);
  block.properties.source[0][0] = `https://notion.so/signed/${encodedUrl}?table=block&id=${block.id}&spaceId=${block.space_id}`; //&name=${videoFilename}&userId=${userId}&cache=v2`;
}
