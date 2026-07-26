import { getFirst } from '../src/getFirst';
import type { LogoContext } from '../src/LogoContext';
import type { LogoInfo } from '../src/LogoInfo';
import { parseRequest } from '../src/parseRequest';
import { makeJsonResponse } from '../src/makeJsonResponse';
import type { RequestContext } from './requestContext';

export async function onRequest(pageContext: RequestContext) {

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
