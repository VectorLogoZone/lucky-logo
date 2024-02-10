import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';

export async function fromRoot(context: LogoContext): Promise<LogoInfo | null> {

    const rootFaviconUrl = `${context.url.origin}/favicon.ico`
    console.log(`rootFaviconUrl: ${rootFaviconUrl}`)

    return {
        provinence: "root",
        url: rootFaviconUrl,
    };
}