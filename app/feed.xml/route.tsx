import dayjs from "dayjs";
import { Feed } from "feed";
import { type ExtendedRecordMap } from "notion-types";
import { getBlockTitle, getPageProperty } from "notion-utils";

import { getPageDescription } from "../../lib/notion_client/getPageDescription";
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

  console.log("Generating feed");

  const items = [];
  for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
    console.log("Checking " + pagePath);
    const pageId = siteMap.canonicalPageMap[pagePath];
    const recordMap = siteMap.pageMap[pageId] as ExtendedRecordMap;
    if (!recordMap) {
      console.log(`Skipping ${pagePath} - RecordMap DNE`);
      continue;
    }

    const block = getFirstBlock(recordMap);
    if (!block) {
      console.log(`Skipping ${pagePath} - Block DNE`);
      continue;
    }

    if (!isBlogPost(block, recordMap)) {
      console.log(`Skipping ${pagePath} - Not a blog post`);
      continue;
    }

    const title = getBlockTitle(block, recordMap) || siteConfig.name;
    const description = await getPageDescription(pageId);
    const link = getCanonicalPageUrl(recordMap)(pageId);
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
    const date = lastUpdatedTime
      ? new Date(lastUpdatedTime)
      : publishedTime
        ? new Date(publishedTime)
        : undefined;

    // const socialImageUrl = await getSocialImageUrl(pageId);

    items.push({
      title,
      author: [author],
      link,
      date,
      description,
      content: description,
      published: new Date(publishedTime),
      // image: new URL(socialImageUrl).toString(),
      // content
      //   enclosure: socialImageUrl
      //     ? {
      //         url: socialImageUrl,
      //         type: "image/jpeg",
      //       }
      //     : undefined,
    });
  }

  // Sort by most recent first
  const sortedItems = items.toSorted((a, b) =>
    dayjs(b.published).diff(a.published),
  );
  sortedItems.forEach((item) => feed.addItem(item));

  const feedText = feedType === "rss" ? feed.rss2() : feed.atom1();

  return new Response(feedText, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
