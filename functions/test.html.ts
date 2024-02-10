import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';

import { render } from '../src/render';

export async function onRequest(pageContext: PagesFunction) {

  const formData = await pageContext.request.formData();
  console.log(formData);
  let input = formData.get('urls');
  console.log(input);

    const form = `
<form method="POST" action="/test.html">
  <fieldset>
    <label>
      Websites
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
            resultRows.push(`    <tr>
        <td>${urls[i]}</td>
        <td><a href="/logo?url=${encodeURIComponent(urls[i])}"><img class="result" src="/logo?url=${encodeURIComponent(urls[i])}" /></a></td>
    </tr>`);
        }
    }

    let results = '';
    if (resultRows.length > 0) {
        results = `<table>${resultRows.join('\n')}</table>`;
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