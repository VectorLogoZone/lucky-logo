import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { fromRoot } from './fromRoot';
import { fromPublicSuffixRoot } from './fromPublicSuffixRoot';
import { fromHeader } from './fromHeader';
import { fromBimi } from './fromBimi';
import { fromVectorLogoZone } from './fromVectorLogoZone';

export async function getAll(context: LogoContext): Promise<LogoInfo[]> {

    const logos: LogoInfo[] = [];

    let logo = await fromRoot(context);
    if (logo) {
        logos.push(logo);
    }

    logo = await fromPublicSuffixRoot(context);
    if (logo) {
        logos.push(logo);
    }

    const headerLogos = await fromHeader(context);
    if (headerLogos) {
        logos.push(...headerLogos);
    }

    const bimiLogos = await fromBimi(context);
    if (bimiLogos) {
        logos.push(...bimiLogos);
    }

    const vlzLogos = await fromVectorLogoZone(context);
    if (vlzLogos) {
        logos.push(...vlzLogos);
    }

    return logos;
}