import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { makeJsonResponse } from '../makeJsonResponse';
import { createRequestContext } from '../requestContext';

export const GET: APIRoute = async ({ params, request }) => {
    const pageContext = createRequestContext(request, env, params);
    return makeJsonResponse(pageContext, {
        success: false,
        message: 'Not implemented',
    });
};
