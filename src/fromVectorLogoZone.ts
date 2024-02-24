import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';


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
    console.log(`Fetched ${entries.length} entries from vectorlogo.zone`);
    for (const entry of entries) {
        let domain = new URL(entry.website).hostname;
        if (domain.startsWith('www.')) {
            domain = domain.slice(4);
        }
        if (!entry.icon && !entry.tile) {
            continue;
        }
        let entries = cache.get(domain);
        if (!entries) {
            entries = []
            cache.set(domain, entries);
        }
        if (entry.icon) {
            entries.push({ url: `https://www.vectorlogo.zone/logos/${entry.logohandle}/${entry.logohandle}-icon.svg`, provenance: 'VectorLogoZone:icons' });
        }
        if (entry.tile) {
            entries.push({ url: `https://www.vectorlogo.zone/logos/${entry.logohandle}/${entry.logohandle}-tile.svg`, provenance: 'VectorLogoZone:tiles' });
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
