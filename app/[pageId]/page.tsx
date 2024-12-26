import { notFound } from "next/navigation";

import NotionPage from "../../components/NotionPage";
import { getSiteMap } from "../../lib/notion_client/getSiteMap";
import NotionClient from "../../lib/notion_client/NotionClient";
import siteConfig from "../../site.config";

export const revalidate = siteConfig.revalidate;

async function Home({ params }) {
  const siteMap = await getSiteMap();
  const notionId = siteMap?.canonicalPageMap[params.pageId];

  try {
    const recordMap = await NotionClient.getPage(notionId);
    return (
      <section className="container w-full flex flex-col">
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
