import * as psl from 'psl';

import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { dnsLookup } from './dnsLookup';

export async function fromBimi(lctx: LogoContext): Promise<LogoInfo[] | null> {

    if (!lctx.basehost) {
        return null;
    }

    const logos: LogoInfo[] = [];

    const logo = await fromBimiHost(lctx, lctx.basehost);
    if (logo) {
        logos.push(logo);
    }

    const pshostname = psl.parse(lctx.basehost).domain;
    if (pshostname && pshostname !== lctx.basehost) {
        const logo = await fromBimiHost(lctx, pshostname);
        if (logo) {
            logos.push(logo);
        }
    }

    return logos.length > 0 ? logos : null;
}


async function fromBimiHost(lctx: LogoContext, host:string): Promise<LogoInfo | null> {
    const bimiUrl = `default._bimi.${host}`;

    const results = await dnsLookup(lctx, 'TXT', bimiUrl);
    if (results.length === 0) {
        lctx.logger.debug({ bimiUrl }, 'fromBimi() no dns entries');
        return null;
    }

    lctx.logger.info({ bimiUrl, results }, 'fromBimi() dns entries');
    for (let result of results) {
        if (result.startsWith('"') && result.endsWith('"')) {
            result = result.slice(1, -1);
        }
        const cols = result.split(/; */);
        if (cols.length < 2) {
            continue;
        }
        if (cols[0] == 'v=BIMI1' && cols[1].startsWith('l=')) {  //LATER: search all columns
            lctx.logger.info({ host, noindex: { results, cols }}, 'BIMI logo found');
            return {
                provenance: 'BIMI',
                url: cols[1].slice(2),
            };
        }
    }

    return null;
}
