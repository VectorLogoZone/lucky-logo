import { PagesFunction } from '@cloudflare/workers-types';

export async function onRequest(ctx: PagesFunction) {

    const website = new URL(ctx.request.url).searchParams.get('url');

    const favicon = new URL('/favicon.ico', website?.toString());

    return Response.redirect(favicon, 302);

}