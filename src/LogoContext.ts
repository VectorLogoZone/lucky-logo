import type { LogoInfo } from './LogoInfo';
import { ErrorCode } from './ErrorCode';
import pino from 'pino';
import type { RequestContext } from './requestContext';

export type LogoContext = {
    basehost?: string,              // hostname without www.
    hostname?: string,              // hostname as parsed from URL
    pageContext: RequestContext,
    requestUrl: URL,                // actual URL
    rawUrl: string,                 // raw url= query parameter
    url?: URL,                      // parsed URL
    errCode?: ErrorCode,
    logos?: LogoInfo[],
    logger: pino.Logger,
}
