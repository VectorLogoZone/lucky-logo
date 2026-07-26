import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
    const env = locals.runtime.env;
    const commit = env.BUILD_COMMIT ? env.BUILD_COMMIT.slice(0, 7) : null;
    return new Response(JSON.stringify({
        success: true,
        message: 'OK',
        commit,
        lastmod: new Date().toISOString(),
        tech: 'Astro + Cloudflare Workers',
    }, null, 2), {
        headers: {
            'Cache-Control': 'no-store',
            'Content-Type': 'application/json',
        },
    });
};
