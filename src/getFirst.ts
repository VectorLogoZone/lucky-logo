import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { fromRoot } from './fromRoot';
import { fromPublicSuffixRoot } from './fromPublicSuffixRoot';
import { fromHeader } from './fromHeader';

export async function getFirst(context: LogoContext): Promise<LogoInfo | null> {

    const headerLogos = await fromHeader(context);
    if (headerLogos && headerLogos.length > 0) {
        return headerLogos[0];
    }

    let logo = await fromRoot(context);
    if (logo) {
        return logo;
    }

    logo = await fromPublicSuffixRoot(context);
    if (logo) {
        return logo;
    }

    return null;
}