export interface SiteConfig {
  rootNotionPageId: string;
  rootNotionSpaceId?: string;

  name: string;
  description: string;
  icon: string;
  dateIcon: string;
  domain: string;
  author: string;
  language?: string;
  revalidate: number;
  showUnpublished: boolean;

  colorSiteTitle?: string;
  colorAccent?: string;
  colorBackground?: string;
  colorPrimary?: string;
  colorBody?: string;
  colorCaption?: string;
  fontHeadingsLarge?: string;
  fontHeadingsSmall?: string;
  fontBody?: string;
}

export interface NavigationLink {
  title: string;
  pageId?: string;
  url?: string;
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config;
};
