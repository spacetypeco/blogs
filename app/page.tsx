import { getDateValue, parsePageId } from "notion-utils";

import Link from "next/link";
import NotionClient from "../lib/notion_client/NotionClient";
import dayjs from "dayjs";
import { getCanonicalPageId } from "../lib/notion_client/getCanonicalPageId";
import { getSiteConfig } from "../lib/notion_client/getSiteMap";

export const revalidate = 60;

async function Home() {
  const rootNotionPageId: string = parsePageId(
    getSiteConfig("rootNotionPageId"),
    { uuid: false },
  );
  console.log("HOME");

  const dbRecords = await NotionClient.getPage(rootNotionPageId);
  const pages = Object.values(dbRecords.block)
    .filter((b) => b.value.type == "page")
    .filter((b) => b.value.properties.JgHm)
    .map((b) => {
      console.log({
        title: b.value.properties.title[0][0],
        rest: b.value.properties,
        publishedDate: getDateValue(b.value.properties.JgHm),
      });
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
    <section className="nav-spacer container w-full flex flex-col">
      {pages.map((page) => {
        return (
          <Link href={page.path}>
            {page.title} - {page.publishedDate.format("MMM DD, YYYY")}
          </Link>
        );
      })}
    </section>
  );
}

export default Home;
