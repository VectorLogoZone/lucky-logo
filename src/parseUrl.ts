import { PagesFunction } from '@cloudflare/workers-types';

type ParseResult = {
    code: string;
    message?: string;
    err?: unknown;
    url?: URL;
}

export async function parseUrl(ctx: PagesFunction): Promise<ParseResult> {

    const website = new URL(ctx.request.url).searchParams.get('url')
    if (!website) {
        return { code: "missing_url", message: "The url query parameter is required" };
    }

    try {
        return { url: new URL(website), code: "success" };
    } catch (err: unknown) {
        return { code: "invalid_url", message: "The url query parameter is not a valid URL", err };
    }
}