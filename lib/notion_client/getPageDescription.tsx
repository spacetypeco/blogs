import { getTextContent } from "notion-utils";

import siteConfig from "../../site.config";
import NotionClient from "./NotionClient";
import { ExtendedRecordMap } from "./types";

export function getPageDescriptionFromRecordMap(recordMap: ExtendedRecordMap) {
  const keys = Object.keys(recordMap?.block || {});

  for (const key of keys) {
    const block = recordMap?.block?.[key].value;
    if (block.type === "text") {
      const txt = getTextContent(block.properties.title);
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
