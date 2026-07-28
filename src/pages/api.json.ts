import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

import { handleJson } from "../lib/handleJson";

export const GET: APIRoute = async (context) => {
    return handleJson(context, {
        success: false,
        message: "Not implemented",
    });
};
