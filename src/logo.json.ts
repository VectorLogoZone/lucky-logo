import { PagesFunction } from '@cloudflare/workers-types';

import { getFirst } from '../src/getFirst';
import { LogoContext } from '../src/LogoContext';
import { LogoInfo } from '../src/LogoInfo';
import { parseRequest } from '../src/parseRequest';
import { makeJsonResponse } from '../src/makeJsonResponse';

export async function onRequest(pageContext: PagesFunction) {

    let lctx: LogoContext = await parseRequest(pageContext);
    let logo: LogoInfo|null = null;
    if (lctx.errCode) {
    } else {
        logo = await getFirst(lctx);
    }

    const data = {
        success: !lctx.errCode,
        message: lctx.errCode ? lctx.errCode : '',
        logo: logo != null ? logo : undefined,
    };


    return makeJsonResponse(pageContext, data);
}