import { PagesFunction } from '@cloudflare/workers-types';

export function makeJsonResponse(ctx:PagesFunction, data:any) {
    //LATER: cors
    //LATER: jsonp
    //LATER: apikey
    return new Response(JSON.stringify(data), { 
        headers: { 
            "content-type": "application/json" 
        }
    });
}