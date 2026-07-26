import type { APIRoute } from 'astro';

import { makeJsonResponse } from '../makeJsonResponse';
import { createRequestContext } from '../requestContext';

export const GET: APIRoute = async ({ locals, params, request }) => {
    const env = locals.runtime.env;
    const pageContext = createRequestContext(request, env, params);
    return makeJsonResponse(pageContext, {
        success: false,
        message: 'Not implemented',
    });
};
