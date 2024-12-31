/**
 * @file Defines the wrapping layout for all other pages.
 *
 * We can add shared stylesheets and set the charset here.
 */
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
// import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
// import "katex/dist/katex.min.css";
import "../styles/base.scss";
import "../styles/themes.scss";
import "../styles/typography.scss";
import "../styles/layout.scss";
import "../styles/logo.scss";
import "../styles/notion-x.scss";

import { Metadata } from "next";

import Navigation from "../components/Navigation";
import siteConfig from "../site.config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.domain}/api/og`],
    url: siteConfig.domain,
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.domain}/api/og`],
  },
};

export default function Layout({ children }) {
  // Update this with your custom Google Analytics ID
  const GoogleAnalytics = (
    <>
      {/* <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-[YOURANALYTICSID]"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-[YOURANALYTICSID]');
        `,
        }}
      /> */}
    </>
  );

  return (
    <html>
      <head>
        {GoogleAnalytics}
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@spacetypeco" />
        <meta property="twitter:image:alt" content="Blog logo" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${siteConfig.icon}</text></svg>`}
        />

        {/* Generate favicons from https://realfavicongenerator.net/ */}
        {/* <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5BBAD5" />
        <meta name="msapplication-TileColor" content="#DA532C" />
        <meta name="theme-color" content="#FFFFFF" /> */}
      </head>
      <body
        style={{
          ["--color-accent" as string]: siteConfig.colorAccent,
          ["--color-site-title" as string]: siteConfig.colorSiteTitle,
          ["--color-background" as string]: siteConfig.colorBackground,
          ["--color-primary" as string]: siteConfig.colorPrimary,
          ["--color-body" as string]: siteConfig.colorBody,
          ["--color-caption" as string]: siteConfig.colorCaption,
          ["--font-headings-large" as string]: siteConfig.fontHeadingsLarge,
          ["--font-headings-small" as string]: siteConfig.fontHeadingsSmall,
          ["--font-body" as string]: siteConfig.fontBody,
          color: "var(--color-primary)",
          backgroundColor: "var(--color-background)",
          transition: "background-color 0.25s",
        }}
      >
        <Navigation />
        <main className="flex flex-col justify-start min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
