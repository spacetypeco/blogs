import { getTextContent } from "notion-utils";

import siteConfig from "../../site.config";
import NotionClient from "./NotionClient";
import type { Block, ExtendedRecordMap } from "./types";

export function getPageDescriptionFromRecordMap(recordMap: ExtendedRecordMap) {
  const keys = Object.keys(recordMap?.block || {});

  for (const key of keys) {
    const entry = recordMap?.block?.[key];
    const block: Block | undefined =
      entry && "value" in entry
        ? (entry.value as unknown as Block)
        : (entry as unknown as Block);
    if (block?.type === "text") {
      const txt = getTextContent(block.properties?.title);
      if (txt.length > 253) {
        return txt.substring(0, 250) + "...";
      } else {
        return txt;
      }
    }
  }
  return siteConfig.description;
}

export async function getPageDescription(pageId: string) {
  const recordMap = await NotionClient.getPage(pageId);
  return getPageDescriptionFromRecordMap(recordMap);
}
