import { PagesFunction } from '@cloudflare/workers-types';

import { LogoContext } from '../src/LogoContext';
import { getFirst } from '../src/getFirst';
import { parseRequest } from '../src/parseRequest';

export async function onRequest(pageContext: PagesFunction) {

    let lctx: LogoContext = await parseRequest(pageContext);
    if (lctx.errCode) {
        console.log(`errCode: ${lctx.errCode}`);
        //LATER: check for fallback parameter
        //LATER: map specific errors to different emoji
        return Response.redirect("http://localhost:4000/images/emoji_u1f62c.svg", 302);
    }

    const logoInfo = await getFirst(lctx);
    if (!logoInfo) {
        //LATER: fallback
        return Response.redirect("http://localhost:4000/images/emoji_u1fae5.svg", 302);
    }
    
    return Response.redirect(logoInfo.url, 302);
}