import type { LogoContext } from '../types/LogoContext';
import type { LogoInfo } from '../types/LogoInfo';
import { fromRoot } from './from/fromRoot';
import { fromPublicSuffixRoot } from './from/fromPublicSuffixRoot';
import { fromHeader } from './from/fromHeader';
import { fromBimi } from './from/fromBimi';
import { fromVectorLogoZone } from './from/fromVectorLogoZone';
import { fromGoogleKnowledgeGraph } from './from/fromGoogleKnowledgeGraph';

export async function getAll(context: LogoContext): Promise<LogoInfo[]> {

    const logos: LogoInfo[] = [];

    const vlzLogos = await fromVectorLogoZone(context);
    if (vlzLogos) {
        logos.push(...vlzLogos);
    }

    const bimiLogos = await fromBimi(context);
    if (bimiLogos) {
        logos.push(...bimiLogos);
    }

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

    const gkgLogos = await fromGoogleKnowledgeGraph(context);
    if (gkgLogos) {
        logos.push(...gkgLogos);
    }

    return logos;
}
