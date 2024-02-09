import { DateTime } from 'luxon';
import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';

import { render } from '../src/render';

interface Env {
    CACHE: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (ctx) => {

    const now = DateTime.now().toUTC();
    const today = now.startOf('day').toISODate();
    const expires = now.endOf('day').toHTTP();
    const website = new URL(ctx.request.url).searchParams.get('url') || 'https://logosear.ch/';
    const logoUrl = `/logo?url=${encodeURIComponent(website)}`;

    const data = {
        title: `Lucky Logo: when you are feeling lucky in your logo search!`,
        h1: `Lucky Logo`,
        content: `
<p>Lucky Logo is a quick way to embed a website's logo without doing any work.  Just use <code>&lt;img src="https://lucky.logosearch.ch/logo?url=https://<i>website_url</i>" &gt;</code></p>
        
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
    value="Roll the dice!"
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
</form>
        `,


        page: { url: '/' },  // for jekyll compability
    }

    const html = await render(data);
    return new Response(html, { headers: {
        'Cache-Control': 'public',
        'Content-Type': 'text/html',
        'Expires':  expires,
        } });
}