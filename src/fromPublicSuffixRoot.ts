import * as psl from 'psl';

import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { isImage } from './isImage';

export async function fromPublicSuffixRoot(lctx: LogoContext): Promise<LogoInfo | null> {

    if (!lctx.url) {
        return null;
    }

    const pshostname = psl.parse(lctx.url.hostname).domain;
    if (!pshostname) {
        lctx.logger.warn({ hostname: lctx.url.hostname }, `fromPublicSuffixRoot() unable to parse public suffix domain`);
        return null;
    }
    if (pshostname === lctx.url.hostname) {
        lctx.logger.debug({ hostname: lctx.url.hostname }, `fromPublicSuffixRoot() public suffix domain is same as hostname`);
        return null;
    }

    const psFaviconUrl = `${lctx.url.protocol}//${pshostname}/favicon.ico`
    console.log(`psFaviconUrl: ${psFaviconUrl}`)
    if (await isImage(lctx, psFaviconUrl))
    {
        return {
            provenance: "fromPublicSuffixRoot",
            url: psFaviconUrl,
        };  
    }

    return null;
}