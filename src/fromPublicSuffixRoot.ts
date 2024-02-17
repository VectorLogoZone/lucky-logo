import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import * as psl from 'psl';

export async function fromPublicSuffixRoot(lctx: LogoContext): Promise<LogoInfo | null> {

    if (!lctx.url) {
        return null;
    }

    const pshostname = psl.parse(lctx.url.hostname).domain;
    if (!pshostname) {
        console.log(`ERROR: unable to parse public suffix domain from hostname: "${lctx.url.hostname}`);
        return null;
    }
    if (pshostname === lctx.url.hostname) {
        console.log(`INFO: public suffix domain is same as hostname: "${lctx.url.hostname}"`);
        return null;
    }

    const psFaviconUrl = `${lctx.url.protocol}//${pshostname}/favicon.ico`
    console.log(`psFaviconUrl: ${psFaviconUrl}`)

    try {
        const response = await fetch(psFaviconUrl);
        if (response.status === 200) {
            return {
                provenance: "fromPublicSuffixRoot",
                url: psFaviconUrl,
            };
        }
        console.log(`ERROR: no ps favicon ${psFaviconUrl}: ${response.status} ${response.statusText}`);
    } catch (err: unknown) {
        console.log(`ERROR: no ps favicon ${psFaviconUrl}: ${err}`);
    }

    return null;
}