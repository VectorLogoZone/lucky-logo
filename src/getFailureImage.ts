import { LogoContext } from './LogoContext';

import { ErrorCode } from './ErrorCode';

const imageMap = {
    [ErrorCode.NO_LOGO_FOUND]: '/images/emoji_u1f92a.svg',
    [ErrorCode.INVALID_URL]: '/images/emoji_u1f92a.svg',
    [ErrorCode.MISSING_URL_PARAM]: '/images/emoji_u1f928.svg',
    [ErrorCode.UNKNOWN]: '/images/emoji_u1f62c.svg',
    [ErrorCode.HOST_NOT_FOUND]: '/images/emoji_u1f635.svg',
};

export function getFailureImage(context: LogoContext, errorCode: ErrorCode): string {
    const prefix = "https://lucky.logosear.ch";
    if (errorCode in imageMap) {
        return `${prefix}${imageMap[errorCode]}`;
    }
    return `${prefix}${imageMap[ErrorCode.UNKNOWN]}`;
}
