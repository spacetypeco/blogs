import { siteConfig } from "./lib/siteConfig";

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: "1644ad451f2f80d9a9ced3a8361244d0",

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; seef the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: "Next.js Notion Starter Kit",
  domain: "localhost:3000",
  author: "Lynne Yun",
});
