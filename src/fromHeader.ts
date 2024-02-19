import * as cheerio from 'cheerio';

import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { isImage } from './isImage';
import { toAbsoluteUrl } from './toAbsoluteUrl';

type ThingToTry = {
    selector: string,
    attribute: string,
}

const thingsToTry = [
    { selector: 'link[rel="icon"]', attribute: 'href' },
    { selector: 'link[rel="shortcut icon"]', attribute: 'href' },
    { selector: 'link[rel="apple-touch-icon"]', attribute: 'href' },
    { selector: 'link[rel="apple-touch-icon-precomposed"]', attribute: 'href' },
    { selector: 'meta[name="og:image"]', attribute: 'content' },
    { selector: 'meta[name="og:logo"]', attribute: 'content' },
    { selector: 'meta[name="twitter:image"]', attribute: 'content' },
];

export async function fromHeader(lctx: LogoContext): Promise<LogoInfo[] | null> {

    if (!lctx.url) {
        return null;
    }

    const logos: LogoInfo[] = [];

    const response = await fetch(lctx.url, {
        headers: {
            'User-Agent': 'LuckyLogoBot',
        },
    });
    if (response.status != 200) {
        lctx.logger.warn({ status: response.status, statusText: response.statusText, url: lctx.url }, `fromHeader() HTTP error`);
        return null;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType) {
        lctx.logger.warn({ headers: response.headers, url: lctx.url }, `fromHeader() no content-type`);
        return null;
    }
    //LATER: handle rss/atom
    if (!contentType.startsWith('text/html')) {
        lctx.logger.warn({ contentType, url: lctx.url }, `fromHeader() not HTML`);
        return null;
    }
    const html = await response.text();

    const $ = cheerio.load(html);

    for (const target of thingsToTry) {
        let $things = $(target.selector);
        if ($things.length == 0) {
            continue;
        }
        for (const thingEl of $things) {
            let url = $(thingEl).attr(target.attribute);
            if (!url) {
                lctx.logger.info({ selector: target.selector }, `found header, but no URL`);
                continue;
            }
            url = toAbsoluteUrl(url, lctx.url.toString());
            if (await isImage(lctx, url)) {
                logos.push({
                    provenance: `fromHeader:${target.selector}`,
                    url: url,
                });
            }
        }
    }

    return logos.length > 0 ? logos : null;
}