import type { APIRoute } from 'astro';
import { DateTime } from 'luxon';

const pages = [
    '/',
    '/alternatives.html',
    '/faq.html',
    '/analyze.html',
    '/compare.html',
];

export const GET: APIRoute = async () => {
    const rows = pages
        .slice()
        .reverse()
        .map((page) => `    <url>\n        <loc>https://lucky.logosear.ch${page}</loc>\n    </url>`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="https://www.sitemap.style/xslt/vanilla-water.xslt" ?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>`;

    return new Response(xml, {
        headers: {
            'Cache-Control': 'public',
            'Content-Type': 'text/xml',
            'Expires': DateTime.now().toUTC().endOf('day').toHTTP() || '',
        },
    });
};
