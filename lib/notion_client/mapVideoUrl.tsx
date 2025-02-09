import { Block } from "./types";

export default function mapVideoUrl(block: Block) {
  if (block.type != "video") {
    return;
  }

  const url = block.properties.source[0][0];

  if (url.startsWith("attachment")) {
    const parts = /^attachment:([a-z0-9\-]*):(.*)/.exec(url);
    const newUrl = `https://prod-files-secure.s3.us-west-2.amazonaws.com/${block.space_id}/${parts[1]}/${parts[2]}`;
    const encodedUrl = encodeURIComponent(newUrl);
    block.properties.source[0][0] = `https://notion.so/signed/${encodedUrl}?table=block&id=${block.id}&spaceId=${block.space_id}`; //&name=${videoFilename}&userId=${userId}&cache=v2`;
    return;
  }

  if (!url.includes("prod-files-secure") || url.includes("signed")) {
    return;
  }

  const encodedUrl = encodeURIComponent(url);
  block.properties.source[0][0] = `https://notion.so/signed/${encodedUrl}?table=block&id=${block.id}&spaceId=${block.space_id}`; //&name=${videoFilename}&userId=${userId}&cache=v2`;
}
