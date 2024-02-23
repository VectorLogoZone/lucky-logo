import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';

import { render } from '../src/render';
import random from '../docs/_data/random.txt';
import { parseUrl } from '../src/parseRequest';

export async function onRequest(pageContext: PagesFunction) {

    let input = '';
    if (pageContext.request.method === 'POST') {
        const formData = await pageContext.request.formData();
        console.log(formData);
        input = formData.get('urls');
        console.log(input);
    } else if (pageContext.request.method === 'GET' && new URL(pageContext.request.url).searchParams.has('random')) {
      const sites = random.split('\n');
      //LATER: get count from random query parameter
      const randomSites:string[] = [];
      for (let loop = 0; loop < 10; loop++) {
        randomSites.push(sites[Math.floor(Math.random() * sites.length)]);
      }
      input = randomSites.join('\n');
    }

    const form = `
<form method="POST" action="/test.html">
  <fieldset>
    <label>
      Websites <span style="float:right;"><a href="?random=10">Try 10 random URLs</a></span>
      <textarea name="urls" rows="7">${input ? input : ''}</textarea>
    </label>
  <input
    type="submit"
    value="Test"
  />
  </fieldset>
</form>`;

    const resultRows:string[] = [];
    if (input) {
        const urls = input.split('\n');
        for (let i = 0; i < urls.length; i++) {
            const lctx = await parseUrl(pageContext, urls[i].trim());
            if (lctx.errCode) {
                continue;
            }
            const linkUrl = lctx.url ? lctx.url.href : '';
            resultRows.push(`    <tr>
        <td><a href="/all-logos.html?url=${encodeURIComponent(lctx.rawUrl)}">${urls[i]}</a></td>
        <td class="resultwrapper"><a href="/logo?url=${encodeURIComponent(urls[i])}"><img alt="Logo from Lucky Logo" class="result" src="/logo?url=${encodeURIComponent(urls[i])}" /></a></td>
        <td class="resultwrapper"><img alt="Logo from Clearbit" class="result" src="https://logo.clearbit.com/${lctx.basehost}" /></td>
    </tr>`);
        }
    }

    let results = '';
    if (resultRows.length > 0) {
        results = `<hr/>
<h2>Results</h2>
<table>
  <thead>
    <th>URL</th>
    <th>Lucky Logo</th>
    <th><a href="https://clearbit.com">Logos provided by Clearbit</a>
  </thead>
  <tbody>
  ${resultRows.join('\n')}
  </tbody>
</table>`;
    }

    const pageData = {
        title: `Bulk Test`,
        url: '/test.html',
    }

    const html = await render(pageData, form + results);
    return new Response(html, { headers: {
        'Cache-Control': 'public',
        'Content-Type': 'text/html',
        } });
}