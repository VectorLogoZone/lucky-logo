import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';
import he from 'he';

import { render } from '../src/render';
import random from '../docs/_data/random.txt';
import { parseUrl } from '../src/parseRequest';

export async function onRequest(pageContext: PagesFunction) {

    let input = '';
    if (pageContext.request.method === 'POST') {
        const formData = await pageContext.request.formData();
        input = formData.get('urls');
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

    const prefix = "https://lucky.logosear.ch";
    const resultRows:string[] = [];
    if (input) {
        const urls = input.split('\n');
        for (let i = 0; i < urls.length; i++) {
            const lctx = await parseUrl(pageContext, urls[i].trim());
            if (lctx.errCode) {
                continue;
            }
            const linkUrl = lctx.url ? lctx.url.href : '';
            const logoUrl = `/logo?url=${encodeURIComponent(urls[i])}`;
            resultRows.push(`    <tr>
        <td>
            <a href="${he.encode(lctx.rawUrl)}">${
                urls[i]
            }</a><br/>
            <a href="/all-logos.html?url=${encodeURIComponent(lctx.rawUrl)}">Test</a>
        </td>
        <td class="resultwrapper"><a href="https://view.svg.zone/view.html?zoom=max&amp;backUrl=${encodeURIComponent(pageContext.request.url)}&amp;url=${encodeURIComponent(prefix + logoUrl)}"><img alt="Logo from Lucky Logo" class="result" src="${he.encode(logoUrl)}" /></a></td>
        <td class="resultwrapper"><img alt="Logo from Clearbit" class="result" src="https://logo.clearbit.com/${
            encodeURIComponent(lctx.basehost || '')
        }" /></td>
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
