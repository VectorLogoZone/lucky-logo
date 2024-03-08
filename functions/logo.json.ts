import { PagesFunction } from '@cloudflare/workers-types';

import { LogoContext } from '../src/LogoContext';
import { getFirst } from '../src/getFirst';
import { parseRequest } from '../src/parseRequest';
import { getFailureImage } from '../src/getFailureImage';
import { ErrorCode } from '../src/ErrorCode';

export async function onRequest(pageContext: PagesFunction) {

    let lctx: LogoContext = await parseRequest(pageContext);
    if (lctx.errCode) {
        return {
            success: false,
            errCode: lctx.errCode,
            url: getFailureImage(lctx, lctx.errCode),
        };
    }

    const logoInfo = await getFirst(lctx);
    if (!logoInfo) {
        return {
            success: false,
            errCode: ErrorCode.NO_LOGO_FOUND,
            url: getFailureImage(lctx, ErrorCode.NO_LOGO_FOUND),
        };
    }

    return {
        success: true,
        url: logoInfo.url
    };
}


