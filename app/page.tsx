import { getPageProperty, parsePageId } from "notion-utils";

import type { Block } from "../lib/notion_client/types";
import NotionClient from "../lib/notion_client/NotionClient";
import PageList from "../components/PageList";
import { getCanonicalPageId } from "../lib/notion_client/getCanonicalPageId";
import { getSiteConfig } from "../lib/notion_client/getSiteMap";
import siteConfig from "../site.config";

export const revalidate = siteConfig.revalidate;

async function Home() {
  const rootNotionPageId: string = parsePageId(
    getSiteConfig("rootNotionPageId"),
    { uuid: false },
  );

  const dbRecords = await NotionClient.getPage(rootNotionPageId);

  /** Unwrap NotionMapBox: can be { value: Block } or { value: { value: Block } } */
  const getBlock = (entry: unknown): Block | undefined => {
    const v = (entry as { value?: unknown })?.value;
    if (v && typeof v === "object" && v !== null && "value" in v) {
      return (v as { value: Block }).value;
    }
    return v as Block | undefined;
  };

  const blockEntries = Object.values(dbRecords.block);
  const pages = blockEntries
    .map((b) => getBlock(b))
    .filter((block): block is Block => block != null && block.type === "page")
    .filter(
      (block) =>
        siteConfig.showUnpublished ||
        getPageProperty<boolean | null>("Published Date", block, dbRecords),
    )
    .map((block) => {
      const publishedTime = getPageProperty<number>(
        "Published Date",
        block,
        dbRecords,
      );
      const type = getPageProperty<string | null>("Type", block, dbRecords);

      return {
        id: block.id,
        title: block.properties?.title?.[0]?.[0] ?? "",
        path: createUrl(
          `/${getCanonicalPageId(block.id, dbRecords, { uuid: false })}`,
          new URLSearchParams(),
        ),
        publishedDate: publishedTime || null,
        type: type || null,
      };
    })
    .toSorted((a, b) => {
      if (a.publishedDate == null && b.publishedDate == null) {
        return 0;
      } else if (b.publishedDate == null) {
        return -1;
      } else if (a.publishedDate == null) {
        return 1;
      } else {
        return b.publishedDate - a.publishedDate;
      }
    });

  function createUrl(path: string, searchParams: URLSearchParams) {
    return [path, searchParams.toString()].filter(Boolean).join("?");
  }

  return <PageList pages={pages} />;
}

export default Home;
