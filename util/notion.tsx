import { getPageProperty } from "notion-utils";

import { Block, ExtendedRecordMap } from "../lib/notion_client/types";

export const getFirstBlock = (recordMap?: ExtendedRecordMap): Block | null => {
  const keys = Object.keys(recordMap?.block || {});
  return recordMap?.block?.[keys[0]]?.value;
};

export const isBlogPost = (block: Block, recordMap: ExtendedRecordMap) =>
  block.type === "page" &&
  getPageProperty<number>("Published Date", block, recordMap);
