# Lucky Logo [<img alt="Lucky-Logo Logo" src="/docs/favicon.svg" height="90" align="right"/>](https://lucky.logosear.ch/)

Logo search, if you are feeling lucky!  Or just want to embed logos in another website without doing any work.

## Running

The site now runs as an [Astro](https://astro.build/) app deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/).

You need:
* Node.js and npm
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/) via the project dependencies

Install dependencies and start local development:

```sh
npm install
npm run dev
```

You can also use `./run.sh`, which now delegates to `npm run dev`.

## Cloudflare Configuration

The Worker configuration lives in `wrangler.jsonc`.

This project does not use Astro sessions or a session KV binding.

For local development, create a `.dev.vars` file for bindings and secrets such as:

```sh
FORCE_HOST=
GKG_ACCESS_TOKEN=
GKG_LOCATION=global
GKG_PROJECT_ID=
LOGODEV_PUBLIC_KEY=
BUILD_COMMIT=
```

For deployed environments, set sensitive values with Wrangler secrets:

```sh
wrangler secret put GKG_ACCESS_TOKEN
wrangler secret put GKG_PROJECT_ID
```

Deploy with:

```sh
npm run deploy
```

## Usage

I'm running this server for free at Cloudflare.  You can use it for *light* non-commercial stuff.

If it starts costing me money, it will go away.  Or worse.

## Options

<details>
<summary>Google Knowledge Graph</summary>

To get results from the [Google Knowledge Graph](https://cloud.google.com/enterprise-knowledge-graph/docs), you need to [enable the API](https://console.cloud.google.com/apis/api/enterpriseknowledgegraph.googleapis.com/credentials) and set the environment variables:

* `GKG_ACCESS_TOKEN`: run `gcloud auth print-access-token`
* `GKG_PROJECT_ID`: configured in Google Cloud
* `GKG_LOCATION`: always "global"

</details>

## License

[AGPLv3](LICENSE.txt)

## Credits

[![Cloudflare](https://www.vectorlogo.zone/logos/cloudflare/cloudflare-ar21.svg)](https://www.cloudflare.com/ "Hosting")
[![Git](https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg)](https://git-scm.com/ "Version control")
[![Github](https://www.vectorlogo.zone/logos/github/github-ar21.svg)](https://github.com/ "Code hosting")
[![Google Knowledge Graph](https://www.vectorlogo.zone/logos/google/google-ar21.svg)](https://cloud.google.com/enterprise-knowledge-graph/docs "Knowledge Graph")
[![Astro](https://www.vectorlogo.zone/logos/astrobuild/astrobuild-ar21.svg)](https://astro.build/ "Website")
[![NodePing](https://www.vectorlogo.zone/logos/nodeping/nodeping-ar21.svg)](https://nodeping.com?rid=201109281250J5K3P "Uptime monitoring")
[![npm](https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg)](https://www.npmjs.com/ "JS Package Management")
[![Pico CSS](https://www.vectorlogo.zone/logos/picocss/picocss-ar21.svg)](https://picocss.com/ "CSS")
[![TopTal](https://www.vectorlogo.zone/logos/toptal/toptal-ar21.svg)](https://www.toptal.com/designers/subtlepatterns/ "Background pattern")
[![TypeScript](https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg)](https://www.typescriptlang.org/ "Programming Language")
[![VectorLogoZone](https://www.vectorlogo.zone/logos/vectorlogozone/vectorlogozone-ar21.svg)](https://www.vectorlogo.zone/ "Logos")
