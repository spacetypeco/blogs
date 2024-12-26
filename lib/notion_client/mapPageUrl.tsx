import { type ExtendedRecordMap } from "notion-types";
import { parsePageId, uuidToId } from "notion-utils";

import { getCanonicalPageId } from "./getCanonicalPageId";
import { getSiteConfig } from "./getSiteMap";

export const mapPageUrl =
  (recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
  (pageId = "") => {
    const pageUuid = parsePageId(pageId, { uuid: true });
    const rootNotionPageId: string = parsePageId(
      getSiteConfig("rootNotionPageId"),
      { uuid: false },
    );

    if (uuidToId(pageUuid) === rootNotionPageId) {
      return createUrl("/", searchParams);
    } else {
      return createUrl(
        `/${getCanonicalPageId(pageUuid, recordMap, { uuid: false })}`,
        searchParams,
      );
    }
  };

export const getCanonicalPageUrl =
  (recordMap: ExtendedRecordMap) =>
  (pageId = "") => {
    const pageUuid = parsePageId(pageId, { uuid: true });
    const rootNotionPageId: string = parsePageId(
      getSiteConfig("rootNotionPageId"),
      { uuid: false },
    );
    const domain = getSiteConfig("domain");
    if (uuidToId(pageId) === rootNotionPageId) {
      return `${domain}`;
    } else {
      return `${domain}/${getCanonicalPageId(pageUuid, recordMap, {
        uuid: false,
      })}`;
    }
  };

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join("?");
}
