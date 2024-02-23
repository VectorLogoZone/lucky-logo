import { PagesFunction } from '@cloudflare/workers-types';

import { makeJsonResponse } from '../src/makeJsonResponse';

export async function onRequest(ctx: PagesFunction ) {
    const data = {
      success: false,
      message: 'Not implemented',
    };
    return makeJsonResponse(ctx, data);
  }