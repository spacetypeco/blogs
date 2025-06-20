import dayjs from "dayjs";
import type { Metadata, ResolvingMetadata } from "next";
import { getBlockTitle, getPageProperty } from "notion-utils";

import { notFound } from "next/navigation";

import NotionPage from "../../components/NotionPage";
import { getPageDescriptionFromRecordMap } from "../../lib/notion_client/getPageDescription";
import { getSiteMap } from "../../lib/notion_client/getSiteMap";
import NotionClient from "../../lib/notion_client/NotionClient";
import siteConfig from "../../site.config";
import { getFirstBlock, isBlogPost } from "../../util/notion";

export const dynamic = "auto";
export const revalidate = siteConfig.revalidate;

type Props = {
  params: Promise<{ pageId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata | null> {
  // read route params
  const pageId = (await params).pageId;

  // fetch data
  const siteMap = await getSiteMap();
  const notionId = siteMap?.canonicalPageMap[pageId];

  if (!notionId) {
    return null;
  }

  const recordMap = await NotionClient.getPage(notionId);
  const socialImageUrl = `${siteConfig.domain}/api/og/blog?id=${notionId}`;
  console.log("SOCIAL IMAGE URL: ", socialImageUrl);

  const block = getFirstBlock(recordMap);

  if (!block || !isBlogPost(block, recordMap)) {
    return null;
  }

  const title = getBlockTitle(block, recordMap) || siteConfig.name;
  const previousImages = (await parent).openGraph?.images || [];
  const description = getPageDescriptionFromRecordMap(recordMap);
  const url = `${siteConfig.domain}/${pageId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      images: socialImageUrl ? [socialImageUrl] : previousImages,
      description,
      url,
    },
    twitter: {
      title,
      description,
      images: socialImageUrl ? [socialImageUrl] : previousImages,
    },
  };
}

async function Home({ params }) {
  const siteMap = await getSiteMap();
  const notionId = siteMap?.canonicalPageMap[params.pageId];

  try {
    const recordMap = await NotionClient.getPage(notionId);
    const block = getFirstBlock(recordMap);
    const publishedTime = getPageProperty<number>(
      "Published Date",
      block,
      recordMap,
    );
    const publishedDate = publishedTime ? dayjs(publishedTime) : null;

    return (
      <section className="container w-full flex flex-col">
        {(publishedDate ||
          process.env.NEXT_PUBLIC_VERCEL_ENV != "production") && (
          <div className="text-sm mt-4 flex items-start gap-2">
            <span>{siteConfig.dateIcon}</span>
            <p
              style={{
                transformOrigin: "center",
                transform: "rotate(3deg) translateY(-2px)",
              }}
            >
              {publishedDate?.format("MMM DD, YYYY") || "unpublished"}
            </p>
          </div>
        )}
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
