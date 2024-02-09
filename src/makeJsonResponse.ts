import { PagesFunction } from '@cloudflare/workers-types';

function makeJsonResponse(ctx:PagesFunction, data:any) {
    return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" }});
}

export {
    makeJsonResponse
}