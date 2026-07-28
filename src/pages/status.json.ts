import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async (context) => {
    return new Response(JSON.stringify({
        success: true,
        message: 'OK',
        commit: env.COMMIT || "(not set)",
        lastmod: env.LASTMOD || "(not set)",
        timestamp: new Date().toISOString(),
        tech: context.generator,
    }, null, 2), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Cache-Control': 'no-store',
            'Content-Type': 'application/json',
        },
    });
};
