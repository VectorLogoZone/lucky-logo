import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { fromRoot } from './fromRoot';
import { fromPublicSuffixRoot } from './fromPublicSuffixRoot';
import { fromHeader } from './fromHeader';
import { fromVectorLogoZone } from './fromVectorLogoZone';
import { fromBimi } from './fromBimi';

export async function getFirst(context: LogoContext): Promise<LogoInfo | null> {

    const vlzLogos = await fromVectorLogoZone(context);
    if (vlzLogos && vlzLogos.length > 0) {
        return vlzLogos[0];
    }

    const bimiLogos = await fromBimi(context);
    if (bimiLogos && bimiLogos.length > 0) {
        return bimiLogos[0];
    }

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
