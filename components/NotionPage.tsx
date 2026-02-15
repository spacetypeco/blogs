"use client";

import { Block, ExtendedRecordMap } from "../lib/notion_client/types";

import { NotionRenderer } from "react-notion-x";
import { mapPageUrl } from "../lib/notion_client/mapPageUrl";
import mapVideoUrl from "../lib/notion_client/mapVideoUrl";
import { useMemo } from "react";

/** Ensure every block has an id so react-notion-x's uuidToId(block.id) never sees undefined. */
function sanitizeRecordMap(recordMap: ExtendedRecordMap) {
  const block = recordMap?.block;
  if (!block) return recordMap;
  const next = { ...recordMap, block: { ...block } };
  for (const key of Object.keys(next.block)) {
    const entry = next.block[key];
    const block = entry?.value as Block | undefined;
    if (block && block.id == null) {
      next.block[key] = {
        ...entry,
        value: { ...block, id: key },
      };
    }
  }
  return next;
}

export default function NotionPage({ recordMap }) {
  const sanitized = useMemo(() => sanitizeRecordMap(recordMap), [recordMap]);

  const siteMapPageUrl = useMemo(() => {
    const params: any = {};
    const searchParams = new URLSearchParams(params);
    return mapPageUrl(sanitized, searchParams);
  }, [sanitized]);

  const keys = Object.keys(sanitized.block || {});

  for (const key of keys) {
    const block = sanitized?.block?.[key]?.value as Block;
    mapVideoUrl(block);
  }

  return (
    <NotionRenderer
      recordMap={sanitized}
      fullPage={true}
      darkMode={false}
      mapPageUrl={siteMapPageUrl}
    />
  );
}
