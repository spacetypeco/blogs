"use client";

import { NotionRenderer } from "react-notion-x";

import { useMemo } from "react";

import { mapPageUrl } from "../lib/notion_client/mapPageUrl";
import mapVideoUrl from "../lib/notion_client/mapVideoUrl";

export default function NotionPage({ recordMap }) {
  const siteMapPageUrl = useMemo(() => {
    const params: any = {};

    const searchParams = new URLSearchParams(params);
    return mapPageUrl(recordMap, searchParams);
  }, [recordMap]);

  const keys = Object.keys(recordMap.block || {});

  for (const key of keys) {
    const block = recordMap?.block?.[key]?.value;
    mapVideoUrl(block);
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      mapPageUrl={siteMapPageUrl}
    />
  );
}
