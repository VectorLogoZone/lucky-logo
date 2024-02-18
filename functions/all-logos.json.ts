import { PagesFunction } from '@cloudflare/workers-types';

import { getAll } from '../src/getAll';
import { LogoContext } from '../src/LogoContext';
import { LogoInfo } from '../src/LogoInfo';
import { parseRequest } from '../src/parseRequest';
import { makeJsonResponse } from '../src/makeJsonResponse';

export async function onRequest(pageContext: PagesFunction) {

    let lctx: LogoContext = await parseRequest(pageContext);
    let logos: LogoInfo[] = [];
    if (lctx.errCode) {
    } else {
        logos = await getAll(lctx);
    }

    const data = {
        success: !lctx.errCode,
        message: lctx.errCode ? lctx.errCode : '',
        logos: logos,
    };


    return  makeJsonResponse(pageContext, data);
}