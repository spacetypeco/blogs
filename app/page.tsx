import dayjs from "dayjs";
import { getDateValue, parsePageId } from "notion-utils";

import Link from "next/link";

import { getCanonicalPageId } from "../lib/notion_client/getCanonicalPageId";
import { getSiteConfig } from "../lib/notion_client/getSiteMap";
import NotionClient from "../lib/notion_client/NotionClient";
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
    .filter((b) => b.value.properties.JgHm)
    .map((b) => {
      return {
        id: b.value.id,
        title: b.value.properties.title[0][0],
        path: createUrl(
          `/${getCanonicalPageId(b.value.id, dbRecords, { uuid: false })}`,
          new URLSearchParams(),
        ),
        publishedDate: dayjs(getDateValue(b.value.properties.JgHm).start_date),
      };
    })
    .toSorted((a, b) => b.publishedDate.diff(a.publishedDate));

  function createUrl(path: string, searchParams: URLSearchParams) {
    return [path, searchParams.toString()].filter(Boolean).join("?");
  }

  return (
    <section className="container w-full flex flex-col pt-12 gap-4">
      {pages.map((page) => {
        return (
          <div className="flex flex-col gap-1">
            <Link href={page.path} className="color-accent-hover t6">
              {page.title}
            </Link>
            <span className="text-base">
              {page.publishedDate.format("MMM DD, YYYY")}
            </span>
          </div>
        );
      })}
    </section>
  );
}

export default Home;
