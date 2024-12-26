import {
  getAllPagesInSpace,
  getPageProperty,
  parsePageId,
  uuidToId,
} from "notion-utils";
import pMemoize from "p-memoize";

import siteConfig from "../../site.config";
import { getCanonicalPageId } from "./getCanonicalPageId";
import NotionClient from "./NotionClient";
import type * as types from "./types";

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  const value = siteConfig[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Config error: missing required site config value "${key}"`);
}

export async function getSiteMap(): Promise<types.SiteMap> {
  const rootNotionPageId: string = parsePageId(
    getSiteConfig("rootNotionPageId"),
    { uuid: false },
  );

  if (!rootNotionPageId) {
    throw new Error('Config error invalid "rootNotionPageId"');
  }
  const partialSiteMap = await getAllPages(
    rootNotionPageId,
    null, //config.rootNotionSpaceId,
  );

  return {
    //site: config.site,
    ...partialSiteMap,
  } as types.SiteMap;
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args),
});

const getPage = async (pageId: string, ...args) => {
  return NotionClient.getPage(pageId, args);
};

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId: string,
): Promise<Partial<types.SiteMap>> {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage,
  );

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId];
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`);
      }

      const block = recordMap.block[pageId]?.value;
      if (
        !(getPageProperty<boolean | null>("Public", block, recordMap) ?? true)
      ) {
        return map;
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid: false,
      });

      if (map[canonicalPageId]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        console.warn("error duplicate canonical page id", {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId],
        });

        return map;
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId,
        };
      }
    },
    {},
  );

  return {
    pageMap,
    canonicalPageMap,
  };
}
