import pino from 'pino';


export async function dnsLookup(logger:pino.Logger<never>, recType:string, domain:string):Promise<string[]> {

    // https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/
    const url = `https://cloudflare-dns.com/dns-query?name=${domain}&type=${recType}`;
    const response = await fetch(url, {
        headers: {
            'accept': 'application/dns-json',
            'User-Agent': 'LuckyLogoBot',
        },
    });
    if (response.status != 200) {
        logger.warn({ status: response.status, statusText: response.statusText, url }, `dnsLookup() HTTP error`);
        return [];
    }
    const json = await response.json();
    if (!json.Answer) {
        logger.warn({ json, url }, `dnsLookup() no answer`);
        return [];
    }
    return json.Answer.map((a:any) => a.data);
}
