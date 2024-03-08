import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';

import { logger } from './logger';

type VlzEntry = {
    icon: boolean,
    logohandle: string,
    tile: boolean,
    website: string,
}

const cache: Map<string, LogoInfo[]> = new Map();

async function init() {
    const data = await fetch('https://www.vectorlogo.zone/util/apidata.json');
    const entries = await data.json() as VlzEntry[];
    logger.info({ count: entries.length }, `entries from vectorlogo.zone`);
    for (const entry of entries) {
        const theUrl = new URL(entry.website)
        let domain = theUrl.hostname;
        if (domain.startsWith('www.')) {
            domain = domain.slice(4);
        }
        if (!entry.icon && !entry.tile) {
            continue;
        }
        const hasPath = theUrl.pathname.length > 1;  //things w/o a path overwrite things with one LATER: store and match on path
        let entries = cache.get(domain);
        if (!entries || !hasPath) {
            entries = []
            cache.set(domain, entries);
        } else if (hasPath) {
            continue;
        }
        if (entry.tile) {
            entries.push({ url: `https://www.vectorlogo.zone/logos/${entry.logohandle}/${entry.logohandle}-tile.svg`, provenance: 'VectorLogoZone:tiles' });
        }
        if (entry.icon) {
            entries.push({ url: `https://www.vectorlogo.zone/logos/${entry.logohandle}/${entry.logohandle}-icon.svg`, provenance: 'VectorLogoZone:icons' });
        }
    }
}

export async function fromVectorLogoZone(lctx: LogoContext): Promise<LogoInfo[] | null> {
    if (!lctx.basehost) {
        return null;
    }
    if (cache.size === 0) {
        await init();
    }
    const entries = cache.get(lctx.basehost);
    if (entries) {
        return entries;
    }
    return null;
}
