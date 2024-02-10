import { DateTime } from 'luxon';
import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';

import { render } from '../src/render';

interface Env {
    CACHE: KVNamespace;
}

const buttonTextOptions = [
    'Roll the dice!',
    'Try your luck!',
    `I'm feeling lucky!`,
    'Spin the wheel!',
]

export const onRequest: PagesFunction<Env> = async (ctx) => {

    const website = new URL(ctx.request.url).searchParams.get('url') || 'https://logosear.ch/';
    const logoUrl = `/logo?url=${encodeURIComponent(website)}`;

    const buttonText = buttonTextOptions[Math.floor(Math.random() * buttonTextOptions.length)];

    const content = `
<p>Lucky Logo is a quick way to embed a website's logo without doing any work.  Just use <code>&lt;img src="https://lucky.logosearch.ch/logo?url=https://<i>website_url</i>" &gt;</code> <a href="faq.html">More...</p>
        
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
      Lucky Logo URL
      <input
        value="https://lucky.logosear.ch${logoUrl}"
        id="logourl"
      />
    </label>
    <div class="result">
        <img class="result"
            src="${logoUrl}"
            
        />
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