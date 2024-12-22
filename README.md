## next-base

This is the Next.js starter template for Space Type projects.

## Developing

You will need to have npm installed. I recommend a version manager like [asdf](https://asdf-vm.com/).

Once you've got that ready, you can spin up local dev:

```sh
npm install && npm run dev
```

## High-Level Architecture

Template Foundations: Next.js 14, Typescript, Tailwind CSS, PostCSS (SASS support), SVGR

## Directory Structure

```
React Fundamentals
└── pages           🤖 Individual website pages, routed based on their filename.
    └── _app.tsx       Defines the "wrapper" layout for all other pages.
└── contexts        🌎 Global site contexts for sharing data/events across components
└── components      🗂 Individual React components, used within pages. Helpful for breaking down your code :)

Styling and Assets
└── public          🔑 Raw HTML/CSS/JS and asset files
└── styles          🔀 Globally-imported CSS files

Logical Organization
└── util            🔨 Small functional utilities
└── lib             🛠️ Larger logical services and models
```

## Deployment

Next.js is built by [Vercel](https://vercel.com/) and I recommend deploying on their system. Their free tier is forgiving and allows you to deploy lightweight frontends and APIs.
