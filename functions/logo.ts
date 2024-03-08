import { PagesFunction } from '@cloudflare/workers-types';

import { getFirst } from '../src/getFirst';
import { LogoContext } from '../src/LogoContext';
import { parseRequest } from '../src/parseRequest';
import { getFailureImage } from '../src/getFailureImage';
import { ErrorCode } from '../src/ErrorCode';

export async function onRequest(pageContext: PagesFunction) {

    let lctx: LogoContext = await parseRequest(pageContext);
    if (lctx.errCode) {
        return Response.redirect(getFailureImage(lctx, lctx.errCode), 302);
    }

    const logoInfo = await getFirst(lctx);
    if (!logoInfo) {
        return Response.redirect(getFailureImage(lctx, ErrorCode.NO_LOGO_FOUND), 302);
    }

    return Response.redirect(logoInfo.url, 302);
}
