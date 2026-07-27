import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { getFirst } from '../getFirst';
import { makeJsonResponse } from '../makeJsonResponse';
import { parseRequest } from '../parseRequest';
import { createRequestContext } from '../requestContext';

export const GET: APIRoute = async ({ params, request }) => {
    const pageContext = createRequestContext(request, env, params);
    const lctx = await parseRequest(pageContext);
    let logo = null;

    if (!lctx.errCode) {
        logo = await getFirst(lctx);
    }

    return makeJsonResponse(pageContext, {
        success: !lctx.errCode,
        message: lctx.errCode ? lctx.errCode : '',
        logo: logo ?? undefined,
    });
};
