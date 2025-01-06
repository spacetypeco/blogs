import { Block } from "./types";

export default function mapVideoUrl(block: Block) {
  if (block.type != "video") {
    return;
  }

  const s3Url = block.properties.source[0][0];

  if (s3Url.includes("signed")) {
    return;
  }

  const encodedUrl = encodeURIComponent(s3Url);
  const videoBlockId = block.id;
  const spaceId = block.space_id;

  block.properties.source[0][0] = `https://notion.so/signed/${encodedUrl}?table=block&id=${videoBlockId}&spaceId=${spaceId}`; //&name=${videoFilename}&userId=${userId}&cache=v2`;
  console.log(block.properties.source[0][0]);
}
