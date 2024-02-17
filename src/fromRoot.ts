import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';

export async function fromRoot(lctx: LogoContext): Promise<LogoInfo | null> {

    if (!lctx.url) {
        return null;
    }

    const rootFaviconUrl = `${lctx.url.origin}/favicon.ico`
    console.log(`rootFaviconUrl: ${rootFaviconUrl}`)

    try {
        const response = await fetch(rootFaviconUrl);
        if (response.status === 200) {
            return {
                provenance: "fromRoot",
                url: rootFaviconUrl,
            };
        }
        console.log(`ERROR: no root favicon ${rootFaviconUrl}: ${response.status} ${response.statusText}`);
    } catch (err:unknown) {
        console.log(`ERROR: no root favicon ${rootFaviconUrl}: ${err}`);
    }

    return null;
}