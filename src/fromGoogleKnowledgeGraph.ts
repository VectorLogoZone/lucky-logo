import * as psl from 'psl';

import { LogoContext } from './LogoContext';
import { LogoInfo } from './LogoInfo';

export async function fromGoogleKnowledgeGraph(lctx: LogoContext): Promise<LogoInfo[] | null> {

    if (!lctx.basehost) {
        return null;
    }

    const accessToken = lctx.pageContext.env.GKG_ACCESS_TOKEN;
    const projectId = lctx.pageContext.env.GKG_PROJECT_ID;
    const location = lctx.pageContext.env.GKG_LOCATION;
    if (!accessToken || !projectId || !location) {
        lctx.logger.warn({ projectId, location }, `fromGoogleKnowledgeGraph() missing env vars`);
        return null;
    }
    const query = encodeURIComponent(lctx.basehost);    //maybe title if we've loaded the home page?
    const limit = 5; // maybe?
    const url = `https://enterpriseknowledgegraph.googleapis.com/v1/projects/${projectId}/locations/${location}/publicKnowledgeGraphEntities:Search?query=${query}&limit=${limit}`;

    let response: Response|null = null;

    try {
        response = await fetch(url,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'LuckyLogoBot',
            },
        });
    } catch (err) {
        lctx.logger.warn({ err, url }, `fromGoogleKnowledgeGraph() fetch error`);
        return null;
    }
    if (response == null) {
        lctx.logger.warn({ url }, `fromGoogleKnowledgeGraph() no response`);
        return null;
    }

    if (response.status != 200) {
        lctx.logger.warn({ status: response.status, statusText: response.statusText, url }, `fromGoogleKnowledgeGraph() HTTP error`);
        return null;
    }

    const logos: LogoInfo[] = [];

    const kgdata = await response.json();
    lctx.logger.info({ url, kgdata, status: response.status }, "fromGoogleKnowledgeGraph() response");
    if (!kgdata) {
        lctx.logger.warn({ url }, `fromGoogleKnowledgeGraph() no JSON data`);
        return null;
    }
    for (const item of kgdata.itemListElement) {
        const logoUrl = item.result?.image?.contentUrl;
        lctx.logger.info({ item, logoUrl: item.result?.image }, "fromGoogleKnowledgeGraph() item");
        if (!logoUrl) {
            continue;
        }
        logos.push({
            url: logoUrl,
            provenance: `Google Knowledge Graph: ${item.result.name} (${item.result['@id']})`,
        });
    }

    return logos.length > 0 ? logos : null;
}
