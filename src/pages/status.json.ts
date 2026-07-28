import { handleJson } from 'src/lib/handleJson';
import type { AstroContext } from '../types/AstroContext';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context:AstroContext) => {
    return handleJson(context, {
        success: true,
        message: 'OK',
        commit: process.env.COMMIT || "(not set)",
        lastmod: process.env.LASTMOD || "(not set)",
        timestamp: new Date().toISOString(),
        tech: context.generator,
    });
};
