import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';
import { fromRoot } from './fromRoot';
import { fromPublicSuffixRoot } from './fromPublicSuffixRoot';

export async function getFirst(context: LogoContext): Promise<LogoInfo | null> {

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