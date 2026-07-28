import type { APIRoute } from 'astro';
import { handleJson } from 'src/lib/handleJson';

export const GET: APIRoute = async (context) => {
    return handleJson(context, {
        success: true,
        message: 'OK',
        commit: process.env.COMMIT || "(not set)",
        lastmod: process.env.LASTMOD || "(not set)",
        timestamp: new Date().toISOString(),
        tech: context.generator,
    });
};
