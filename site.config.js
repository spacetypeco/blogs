import { siteConfig } from "./lib/siteConfig";

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: process.env.ROOT_NOTION_PAGE_ID,

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: "Small Caps",
  domain: process.env.SITE_DOMAIN,
  author: process.env.SITE_AUTHOR,

  // revalidation config
  revalidate: process.env.SITE_REVALIDATE
    ? parseInt(process.env.SITE_REVALIDATE)
    : 60,

  // themes!
  colorBackground: process.env.THEME_COLOR_BACKGROUND,
  colorAccent: process.env.THEME_COLOR_ACCENT,
});
