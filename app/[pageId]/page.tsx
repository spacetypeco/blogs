import dayjs from "dayjs";
import { getDateValue, parsePageId } from "notion-utils";

import Link from "next/link";
import { notFound } from "next/navigation";

import NotionPage from "../../components/NotionPage";
import { getSiteMap } from "../../lib/notion_client/getSiteMap";
import NotionClient from "../../lib/notion_client/NotionClient";
import siteConfig from "../../site.config";
import { getFirstBlock } from "../../util/notion";

export const dynamic = "auto";
export const revalidate = siteConfig.revalidate;

async function Home({ params }) {
  const siteMap = await getSiteMap();
  const notionId = siteMap?.canonicalPageMap[params.pageId];

  try {
    const recordMap = await NotionClient.getPage(notionId);
    const block = getFirstBlock(recordMap);
    const publishedDate = dayjs(
      getDateValue(block.properties["JgHm"]).start_date,
    );

    return (
      <section className="container w-full flex flex-col">
        <div className="text-sm mt-4 flex items-start gap-2">
          <span>{siteConfig.dateIcon}</span>
          <p
            style={{
              transformOrigin: "center",
              transform: "rotate(3deg) translateY(-2px)",
            }}
          >
            {publishedDate.format("MMM DD, YYYY")}
          </p>
        </div>
        <NotionPage recordMap={recordMap} />
      </section>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export async function generateStaticParams() {
  const siteMap = await getSiteMap();

  return Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
    pageId,
  }));
}

export default Home;
