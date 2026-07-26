import type { APIRoute } from 'astro';

import { ErrorCode } from '../ErrorCode';
import { getFailureImage } from '../getFailureImage';
import { getFirst } from '../getFirst';
import { parseRequest } from '../parseRequest';
import { createRequestContext } from '../requestContext';

export const GET: APIRoute = async ({ locals, params, request }) => {
    const env = locals.runtime.env;
    const pageContext = createRequestContext(request, env, params);
    const lctx = await parseRequest(pageContext);
    if (lctx.errCode) {
        return Response.redirect(getFailureImage(lctx, lctx.errCode), 302);
    }

    const logoInfo = await getFirst(lctx);
    if (!logoInfo) {
        return Response.redirect(getFailureImage(lctx, ErrorCode.NO_LOGO_FOUND), 302);
    }

    return Response.redirect(logoInfo.url, 302);
};
