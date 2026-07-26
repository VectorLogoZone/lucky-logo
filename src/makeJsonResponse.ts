import type { RequestContext } from './requestContext';

export function makeJsonResponse(_ctx: RequestContext, data:any) {
    //LATER: cors
    //LATER: jsonp
    //LATER: apikey
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json"
        }
    });
}
