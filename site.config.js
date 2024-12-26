import { siteConfig } from "./lib/siteConfig";

const Config = {
  "small caps": {
    icon: "🧢",
    description: "It's a blog!",
    domain: "https://smallcaps.spacetypeco.com",
    author: "lynne",
    rootNotionPageId: "1644ad451f2f80d9a9ced3a8361244d0",
    colorBackground: "#fff1f1",
    colorAccent: "var(--color-scarlet)",
    fontHeadingsLarge: "ST Felicette Medium",
    fontHeadingsSmall: "ST Felicette Regular",
    fontBody: "ST Felicette Regular",
    colorPrimary: "#ff6d6d",
    colorBody: "#ff6d6d",
    colorCaption: "#ff6d6d",
  },
  "ok, ok, ok": {
    icon: "👌",
    description: "ok! ok! ok!",
    domain: "https://ok.spacetypeco.com",
    author: "kevin",
    rootNotionPageId: "1684ad451f2f80ce86b9d96b445a204f",
    colorBackground: "#faf1ff",
    colorAccent: "var(--color-blue)",
    fontHeadingsLarge: "ST Monochromic Bold",
    fontHeadingsSmall: "ST Monochromic Regular",
    fontBody: "ST Felicette Regular",
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
