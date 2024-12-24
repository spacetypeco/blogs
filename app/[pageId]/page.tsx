import NotionClient from "../../lib/notion_client/NotionClient";
import NotionPage from "../../components/NotionPage";
import { getSiteMap } from "../../lib/notion_client/getSiteMap";

export const revalidate = 60;

async function Home({ params }) {
  const siteMap = await getSiteMap();
  const notionId = siteMap?.canonicalPageMap[params.pageId];
  const recordMap = await NotionClient.getPage(notionId);

  return (
    <section className="nav-spacer container w-full flex flex-col">
      <NotionPage recordMap={recordMap} />
    </section>
  );
}

export async function generateStaticParams() {
  console.log("generate static");

  // if (isDev) {
  //   return {
  //     paths: [],
  //     fallback: true,
  //   };
  // }

  const siteMap = await getSiteMap();

  const paths = Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
    pageId,
  }));
  console.log(paths);
  return paths;
}

export default Home;
