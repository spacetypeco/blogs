import { defaultMapImageUrl } from "notion-utils";

import NotionClient from "./NotionClient";
import { ExtendedRecordMap } from "./types";

export async function getSocialImageUrlFromRecordMap(
  recordMap: ExtendedRecordMap,
) {
  const keys = Object.keys(recordMap?.block || {});

  for (const key of keys) {
    const block = recordMap?.block?.[key].value;
    if (block.type === "image") {
      const source = block.properties.source[0][0];
      console.log(defaultMapImageUrl(source, block));
      return defaultMapImageUrl(source, block);
    }
  }

  return "";
}

export async function getSocialImageUrl(pageId: string) {
  const recordMap = await NotionClient.getPage(pageId);
  return getSocialImageUrlFromRecordMap(recordMap);
}
