import { PagesFunction } from '@cloudflare/workers-types';
import he from 'he';

import { getAll } from '../src/getAll';
import { LogoContext } from '../src/LogoContext';
import { LogoInfo } from '../src/LogoInfo';
import { parseRequest } from '../src/parseRequest';
import { render } from '../src/render';

export async function onRequest(pageContext: PagesFunction) {

    let alert:string = '';
    let header:string = '';
    let lctx: LogoContext = await parseRequest(pageContext);
    let logos: LogoInfo[] = [];
    if (lctx.errCode) {
        if (lctx.errCode != 'MISSING_URL_PARAM') {
            header = `<p>Error: ${lctx.errCode}</p>`;
        }
    } else {
        header = `<h2>All logos found for for <a href="${lctx.url?.toString()}">${lctx.rawUrl}</a></h2>`
        logos = await getAll(lctx);
        if (!logos || logos.length == 0) {
            header += `<p>No logos found</p>`;
        } else {
            logos.push({
                url: `https://logo.clearbit.com/${lctx.basehost}`,
                provenance: 'Clearbit',
            })
        }
    }

    let table = '';
    const resultRows: string[] = [];
    if (logos && logos.length > 0) {
        for (let i = 0; i < logos.length; i++) {
            resultRows.push(`        <tr>
            <td>${
                he.encode(logos[i].provenance)
            }<br/><a href="${he.encode(logos[i].url)}">${
                logos[i].url
            }</a></td>
            <td class="resultwrapper"><a href="https://view.svg.zone/view.html?zoom=max&amp;backUrl=${encodeURIComponent(
                pageContext.request.url
            )}&amp;url=${encodeURIComponent(
                logos[i].url
            )}"><img alt="Logo via ${
                logos[i].provenance
            }" class="result" src="${logos[i].url}" /></a></td>
        </tr>`);
        }
        table = `<table>
    <thead>
        <tr>
            <th>Source</th>
            <th>Logo</th>
        </tr>
    </thead>
    <tbody>
${resultRows.join('\n')}
    </tbody>
</table>`;
    }


    const form = `
<form method="GET" action="/all-logos.html">
  <fieldset>
    <label>
      Website
      <input name="url" value="${lctx.rawUrl}" />
    </label>
  <input
    type="submit"
    value="Get Logos"
  />
  </fieldset>
</form>`;

    const pageData = {
        title: `All Logos`,
        url: '/all-logos.html',
    }

    const html = await render(pageData, form + header + table);
    return new Response(html, {
        headers: {
            'Cache-Control': 'public',
            'Content-Type': 'text/html',
        }
    });


}
