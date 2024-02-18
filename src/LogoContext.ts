import { PagesFunction } from '@cloudflare/workers-types';
import { LogoInfo } from './LogoInfo';
import pino from 'pino';

export type LogoContext = {
    basehost?: string,              // hostname without www.
    hostname?: string,              // hostname as parsed from URL
    pageContext: PagesFunction,
    requestUrl: URL,                // actual URL
    rawUrl: string,                 // raw url= query parameter
    url?: URL,                      // parsed URL
    errCode?: string,
    logos?: LogoInfo[],
    logger: pino.Logger,
}