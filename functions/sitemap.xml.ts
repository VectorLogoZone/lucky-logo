import { PagesFunction } from '@cloudflare/workers-types';
//import { encode } from 'html-entities';
import { DateTime } from 'luxon';


const pages = [
    '/',
    '/alternatives',
    '/faq',
]

export async function onRequest(pageContext: PagesFunction) {

    const rows:string[] = [];

    for (let i = pages.length - 1; i >= 0; i--) {
        rows.push(`    <url>
        <loc>https://lucky.logosear.ch${pages[i]}</loc>
    </url>`);
    }

    const today = DateTime.now().toUTC().startOf('day').toISODate();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://www.sitemap.style/xslt/vanilla-water.xslt" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.join('\n')}
</urlset>`;

    const expires = DateTime.now().toUTC().endOf('day').toHTTP() || '';
    
    return new Response(xml, { headers: {
        'Cache-Control': 'public',
        'Content-Type': 'text/xml',
        'Expires':  expires,
        } });
}