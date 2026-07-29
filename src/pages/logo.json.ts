import type { APIRoute } from 'astro';

import { getFirst } from '../lib/getFirst';
import { handleJson } from "../lib/handleJson";
import { parseRequest } from '../lib/parseRequest';

export const GET: APIRoute = async (context) => {
    const lctx = await parseRequest(context);
    let logo = null;

    if (!lctx.errCode) {
        logo = await getFirst(lctx);
    }

    return handleJson(context, {
        success: !lctx.errCode,
        message: lctx.errCode ? lctx.errCode : "",
        logo: logo ?? undefined,
    });
};
