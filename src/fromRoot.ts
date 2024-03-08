import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';

export async function fromRoot(lctx: LogoContext): Promise<LogoInfo | null> {

    if (!lctx.url) {
        return null;
    }

    const rootFaviconUrl = `${lctx.url.origin}/favicon.ico`
    lctx.logger.info( { url: rootFaviconUrl }, 'checking for root favicon');

    try {
        const response = await fetch(rootFaviconUrl);
        if (response.status === 200) {
            return {
                provenance: "fromRoot",
                url: rootFaviconUrl,
            };
        }
        lctx.logger.info( { url: rootFaviconUrl, status: response.status, statusText: response.statusText}, 'no root favicon');
    } catch (err:unknown) {
        lctx.logger.info( { url: rootFaviconUrl, err }, 'root favicon fetch error');
    }

    return null;
}
