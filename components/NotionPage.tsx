"use client";

import { NotionRenderer } from "react-notion-x";
import { mapPageUrl } from "../lib/notion_client/mapPageUrl";
import { useMemo } from "react";

export default function NotionPage({ recordMap }) {
  const siteMapPageUrl = useMemo(() => {
    const params: any = {};

    const searchParams = new URLSearchParams(params);
    return mapPageUrl(recordMap, searchParams);
  }, [recordMap]);

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      mapPageUrl={siteMapPageUrl}
    />
  );
}
