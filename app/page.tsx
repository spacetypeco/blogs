import { getPageProperty, parsePageId } from "notion-utils";

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
  const pages = Object.values(dbRecords.block)
    .filter((b) => b.value.type == "page")
    .filter(
      (b) =>
        siteConfig.showUnpublished ||
        getPageProperty<boolean | null>("Published Date", b.value, dbRecords),
    )
    .map((b) => {
      const publishedTime = getPageProperty<number>(
        "Published Date",
        b.value,
        dbRecords,
      );
      const type = getPageProperty<string | null>("Type", b.value, dbRecords);

      return {
        id: b.value.id,
        title: b.value.properties.title[0][0],
        path: createUrl(
          `/${getCanonicalPageId(b.value.id, dbRecords, { uuid: false })}`,
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
