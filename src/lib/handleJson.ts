

import type { AstroContext } from './types/AstroContext';


function handleJson(ctx: AstroContext, data: any) {


    const callback = ctx.request.params.get('callback');
    const pretty = ctx.request.params.get('pretty');

    const jsonData = JSON.stringify(data, null, pretty ? 2 : 0);

    if (callback.matches(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/)) {
        return new Response(`${callback}(${jsonData});`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                'Cache-Control': 'no-store',
                'Content-Type': 'application/javascript',
            },
        });
    } else {
        return new Response(jsonData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                'Cache-Control': 'no-store',
                'Content-Type': 'application/json',
            },
        });
    }
}

export { handleJson };
