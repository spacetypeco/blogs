import { siteConfig } from "./lib/siteConfig";

const Config = {
  "small caps": {
    description: "It's a blog!",
    domain: "https://smallcaps.spacetypeco.com",
    author: "lynne",
    rootNotionPageId: "1644ad451f2f80d9a9ced3a8361244d0",
    // colorBackground:
    colorAccent: "var(--color-scarlet)",
  },
};

export default siteConfig({
  // basic site info (required)
  name: process.env.NEXT_PUBLIC_SITE_NAME,
  ...Config[process.env.NEXT_PUBLIC_SITE_NAME],

  // revalidation config
  revalidate: process.env.NEXT_PUBLIC_SITE_REVALIDATE
    ? parseInt(process.env.NEXT_PUBLIC_SITE_REVALIDATE)
    : 60,
});
