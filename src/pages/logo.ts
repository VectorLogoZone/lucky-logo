import type { APIRoute } from 'astro';

import { ErrorCode } from '../types/ErrorCode';
import { getFailureImage } from '../lib/getFailureImage';
import { getFirst } from '../lib/getFirst';
import { parseRequest } from '../lib/parseRequest';

export const GET: APIRoute = async (context) => {
    const lctx = await parseRequest(context);
    if (lctx.errCode) {
        return Response.redirect(getFailureImage(lctx, lctx.errCode), 302);
    }

    const logoInfo = await getFirst(lctx);
    if (!logoInfo) {
        return Response.redirect(getFailureImage(lctx, ErrorCode.NO_LOGO_FOUND), 302);
    }

    return Response.redirect(logoInfo.url, 302);
};
