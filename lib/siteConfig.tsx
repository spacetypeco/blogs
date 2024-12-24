export interface SiteConfig {
  rootNotionPageId: string;
  rootNotionSpaceId?: string;

  name: string;
  domain: string;
  author: string;
  description?: string;
  language?: string;
}

export interface NavigationLink {
  title: string;
  pageId?: string;
  url?: string;
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config;
};
