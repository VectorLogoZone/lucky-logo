import { LogoContext } from './LogoContext';


export async function dnsLookup(lctx:LogoContext, recType:string, domain:string):Promise<string[]> {
    const url = `https://cloudflare-dns.com/dns-query?name=${domain}&type=${recType}`;
    const response = await fetch(url, {
        headers: {
            'accept': 'application/dns-json',
            'User-Agent': 'LuckyLogoBot',
        },
    });
    if (response.status != 200) {
        lctx.logger.warn({ status: response.status, statusText: response.statusText, url }, `dnsLookup() HTTP error`);
        return [];
    }
    const json = await response.json();
    if (!json.Answer) {
        lctx.logger.warn({ json, url }, `dnsLookup() no answer`);
        return [];
    }
    return json.Answer.map((a:any) => a.data);
}