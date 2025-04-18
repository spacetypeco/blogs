## blogs

This is the mini-blogging platform for our mini-blogs.

- [small caps](https://smallcaps.spacetypeco.com)
- [ok, ok, ok](https://ok.spacetypeco.com)

## Developing

You will need to have npm installed. I recommend a version manager like [asdf](https://asdf-vm.com/).

Once you've got that ready, you can spin up local dev:

```sh
npm install && npm run dev
```

## Configuration

Individual sites are configured under [site.config.js](/site.config.js).

## Deployment

This repo automatically deploys to all blogs via Github Actions when changes are pushed to main. View deployments under [the Actions tab](https://github.com/spacetypeco/blogs/actions).

## High-Level Architecture

Foundations: Next.js 14, Typescript, Tailwind CSS, PostCSS (SASS support), SVGR
