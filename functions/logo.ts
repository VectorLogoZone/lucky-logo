import { PagesFunction } from '@cloudflare/workers-types';

import { LogoContext } from '../src/LogoContext';
import { LogoInfo } from '../src/LogoInfo';
import { fromRoot } from '../src/fromRoot';
import { parseUrl } from '../src/parseUrl';

export async function onRequest(pageContext: PagesFunction) {

    const parseResult = await parseUrl(pageContext);
    if (!parseResult.url) {
        console.log("no parseResult.url");
        return Response.redirect("https://em-content.zobj.net/source/google/387/zany-face_1f92a.png", 302);
        // /images/emoji_1fae5.svg", 302);
    }
    
    const logoContext = { pageContext, url: parseResult.url };

    const logoInfo = await fromRoot(logoContext);
    if (!logoInfo) {
        console.log("no root");
        return Response.redirect("https://em-content.zobj.net/source/google/387/face-with-spiral-eyes_1f635-200d-1f4ab.png", 302);
        //"/images/emoji_1fae5.svg", 302);
    }

    console.log(`logoInfo.url: ${logoInfo.url}`, logoInfo);
    
    return Response.redirect(logoInfo.url, 302);
}