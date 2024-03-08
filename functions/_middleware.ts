import { PagesFunction } from '@cloudflare/workers-types';

import { logger } from '../src/logger';

interface Env {
    FORCE_HOST: string;
}

export async function onRequest(context: PagesFunction<Env>): Promise<Response> {
    const desiredHost = context.env.FORCE_HOST;
    if (desiredHost) {
        const requestUrl = new URL(context.request.url);
        const hostname = requestUrl.host;
        if (hostname != desiredHost) {
            logger.info({ hostname }, 'Redirecting to desired host');
            return Response.redirect(`${requestUrl.protocol}//${desiredHost}${requestUrl.pathname}${requestUrl.search}`);
        }
    }
    //try {
        return await context.next();
    //} catch (err) {
    //    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    //}
}
