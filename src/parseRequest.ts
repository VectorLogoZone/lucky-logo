import { LogoContext } from './LogoContext';
import { PagesFunction } from '@cloudflare/workers-types';
import { logger as parentLogger } from './logger';
import { dnsLookup } from './dnsLookup';
import { ErrorCode } from './ErrorCode';

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
            logger: parentLogger,
            errCode: "MISSING_URL_PARAM",
            requestUrl,
            rawUrl: '',
        };
    }
    const logger = parentLogger.child({ rawUrl });

    let parseableUrl = rawUrl;
    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        parseableUrl = `https://${rawUrl}`;
        logger.info({ rawUrl, parseableUrl }, 'Adding https:// to URL')
    }

    let url:URL;
    try {
        url = new URL(parseableUrl);
    } catch (err: unknown) {
        logger.error({ err: err as Error }, 'Error parsing URL');
        return {
            errCode: ErrorCode.INVALID_URL,
            logger,
            pageContext: ctx,
            rawUrl,
            requestUrl,
        };
    }
    const hostname = url.hostname;
    const addresses = await dnsLookup(logger, "A", hostname);
    if (addresses.length === 0) {
        return {
            errCode: ErrorCode.HOST_NOT_FOUND,
            logger,
            pageContext: ctx,
            rawUrl,
            requestUrl,
        };
    }

    const basehost = hostname.toLowerCase().startsWith('www.') ? hostname.substring(4) : hostname;

    return {
        basehost,
        hostname,
        logger,
        pageContext: ctx,
        requestUrl,
        rawUrl,
        url,
    };
}
