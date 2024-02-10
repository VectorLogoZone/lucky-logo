import { PagesFunction } from '@cloudflare/workers-types';

export type LogoContext = {
    pageContext: PagesFunction,
    url: URL,
}