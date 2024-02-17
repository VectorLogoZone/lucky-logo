import raw from 'liquidjs/dist/src/tags/raw';
import { LogoContext } from './LogoContext';
import { PagesFunction } from '@cloudflare/workers-types';

export async function parseRequest(ctx: PagesFunction): Promise<LogoContext> {
    return parseUrl(ctx, null);
}

export async function parseUrl(ctx: PagesFunction, rawUrl:string|null): Promise<LogoContext> {

    const requestUrl = new URL(ctx.request.url);
    if (rawUrl == null) {
        rawUrl = requestUrl.searchParams.get('url');
    }
    if (!rawUrl) {
        return {
            pageContext: ctx,
            errCode: "MISSING_URL_PARAM",
            requestUrl,
            rawUrl: '',
        };
    }

    let parseableUrl = rawUrl;
    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        parseableUrl = `https://${rawUrl}`;
    }

    let url:URL;
    try {
        url = new URL(parseableUrl);
    } catch (err: unknown) {
        return {
            errCode: "INVALID_URL",
            pageContext: ctx,
            rawUrl,
            requestUrl,
        };
    }
    const hostname = url.hostname;
    const basehost = hostname.startsWith('www.') ? hostname.substring(4) : hostname;

    return {
        basehost,
        hostname,
        pageContext: ctx,
        requestUrl,
        rawUrl,
        url,
    };
}