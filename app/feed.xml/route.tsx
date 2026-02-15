import dayjs from "dayjs";
import { Feed } from "feed";
import { type ExtendedRecordMap } from "notion-types";
import { getBlockTitle, getPageProperty } from "notion-utils";

import { getPageDescriptionFromRecordMap } from "../../lib/notion_client/getPageDescription";
import { getSiteMap } from "../../lib/notion_client/getSiteMap";
import { getSocialImageUrl } from "../../lib/notion_client/getSocialImageUrl";
import { getCanonicalPageUrl } from "../../lib/notion_client/mapPageUrl";
import siteConfig from "../../site.config";
import { getFirstBlock, isBlogPost } from "../../util/notion";

export const revalidate = siteConfig.revalidate;

export async function GET(req) {
  const siteMap = await getSiteMap();
  const author = { name: siteConfig.author };
  const params = req.nextUrl.searchParams;
  const feedType = params.get("type");

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    author,
    link: siteConfig.domain,
    feedLinks: {
      rss: `${siteConfig.domain}/feed.xml?type=rss`,
      atom: `${siteConfig.domain}/feed.xml`,
    },
    language: siteConfig.language,
    id: siteConfig.domain,
    copyright: "",
  });

  // First pass: collect minimal data (no description/title/link) so we can sort and take top 5
  const candidates: Array<{
    pageId: string;
    recordMap: ExtendedRecordMap;
    block: ReturnType<typeof getFirstBlock>;
    publishedTime: number;
    lastUpdatedTime: number | undefined;
  }> = [];
  for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
    const pageId = siteMap.canonicalPageMap[pagePath];
    const recordMap = siteMap.pageMap[pageId] as ExtendedRecordMap;
    if (!recordMap) continue;

    const block = getFirstBlock(recordMap);
    if (!block) continue;

    if (!isBlogPost(block, recordMap)) continue;

    const lastUpdatedTime = getPageProperty<number>(
      "Last Updated",
      block,
      recordMap,
    );
    const publishedTime = getPageProperty<number>(
      "Published Date",
      block,
      recordMap,
    );
    candidates.push({
      pageId,
      recordMap,
      block,
      publishedTime: publishedTime ?? 0,
      lastUpdatedTime,
    });
  }

  // Sort by most recent first and take only the 5 we need
  const top5 = candidates
    .toSorted((a, b) => b.publishedTime - a.publishedTime)
    .slice(0, 5);

  // Second pass: build full feed items only for the top 5
  for (const { pageId, recordMap, block, publishedTime, lastUpdatedTime } of top5) {
    const title = getBlockTitle(block, recordMap) || siteConfig.name;
    const description = getPageDescriptionFromRecordMap(recordMap);
    const link = getCanonicalPageUrl(recordMap)(pageId);
    const date = lastUpdatedTime
      ? new Date(lastUpdatedTime)
      : publishedTime
        ? new Date(publishedTime)
        : undefined;

    feed.addItem({
      title: (title ?? siteConfig.name) as string,
      author: [author],
      link: link as string,
      date: date ?? new Date(publishedTime),
      description: (description ?? "") as string,
      content: (description ?? "") as string,
      published: new Date(publishedTime),
    });
  }

  const feedText = feedType === "rss" ? feed.rss2() : feed.atom1();

  return new Response(feedText, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
