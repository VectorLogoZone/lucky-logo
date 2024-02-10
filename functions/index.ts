import { DateTime } from 'luxon';
import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';

import { render } from '../src/render';

interface Env {
    CACHE: KVNamespace;
}

const buttonTextOptions = [
    'Roll the dice!',
    'Try me!',
    `I'm feeling lucky!`,
    'Spin the wheel!',
    'Please, god, let this work!',
    'Lord have mercy!',
    `Here's hoping...`,
    'I believe!',
    'Fortune favors the bold!',
];

const sampleWebsites = [
    'https://logosear.ch/',
    'https://iconsear.ch/',
    'https://www.vectorlogo.zone/',
    'https://www.feed.style/',
    'https://www.fortune.ninja/',
    'https://www.sitemap.style/',
    'https://www.supertinyicons.org/',
    'https://resolve.rs/',
    'https://www.freeloader.wtf/',
];

export const onRequest: PagesFunction<Env> = async (ctx) => {

    let website = new URL(ctx.request.url).searchParams.get('url');
    if (!website || sampleWebsites.indexOf(website) !== -1) {
      website = sampleWebsites[Math.floor(Math.random() * sampleWebsites.length)];
    }
    const logoUrl = `/logo?url=${encodeURIComponent(website)}`;

    const buttonText = buttonTextOptions[Math.floor(Math.random() * buttonTextOptions.length)];

    const content = `
<p>Lucky Logo is a quick way to embed a website's logo without doing any work.  <a href="faq.html">More...</a></p>
        
<form method="GET" action="/">
  <fieldset>
    <label>
      Website
      <input
        value="${website}"
        name="url"
      />
    </label>
  <input
    type="submit"
    value="${buttonText}"
  />
  </fieldset>


      <label>
      Lucky Logo <code>&lt;img src="" &gt;</code>
      <input
        value="https://lucky.logosear.ch${logoUrl}"
        id="logourl"
      />
    </label>
    <div class="result">
        <a href="${logoUrl}"><img class="result" src="${logoUrl}" /></a>
    <!--<label for="background">
      <input type="checkbox" role="switch" id="background" name="background">
      Background
    </label>-->
    </div>
</form>`;

    const pageData = {
        h1: `Lucky Logo`,
        title: `Lucky Logo: when you are feeling lucky in your logo search!`,
        url: '/',
    }

    const html = await render(pageData, content);
    return new Response(html, { headers: {
        'Cache-Control': 'public',
        'Content-Type': 'text/html',
        } });
}