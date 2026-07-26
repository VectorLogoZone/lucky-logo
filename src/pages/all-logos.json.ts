import type { APIRoute } from 'astro';

import { getAll } from '../getAll';
import { makeJsonResponse } from '../makeJsonResponse';
import { parseRequest } from '../parseRequest';
import { createRequestContext } from '../requestContext';

export const GET: APIRoute = async ({ locals, params, request }) => {
    const env = locals.runtime.env;
    const pageContext = createRequestContext(request, env, params);
    const lctx = await parseRequest(pageContext);
    const logos = lctx.errCode ? [] : await getAll(lctx);

    return makeJsonResponse(pageContext, {
        success: !lctx.errCode,
        message: lctx.errCode ? lctx.errCode : '',
        logos,
    });
};
