import type { APIRoute } from 'astro';

import { getAll } from '../lib/getAll';
import { handleJson } from '../lib/handleJson';
import { parseRequest } from '../lib/parseRequest';

export const GET: APIRoute = async (context) => {
    const lctx = await parseRequest(context);
    const logos = lctx.errCode ? [] : await getAll(lctx);

    return handleJson(context, {
        success: !lctx.errCode,
        message: lctx.errCode ? lctx.errCode : '',
        logos,
    });
};
