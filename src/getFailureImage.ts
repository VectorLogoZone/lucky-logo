import { LogoContext } from './LogoContext';

import { ErrorCode } from './ErrorCode';

const imageMap = {
    [ErrorCode.NO_LOGO_FOUND]: "/images/emoji_u1f92a.svg",
    [ErrorCode.INVALID_URL]: "/images/errors/bad_url.svg",
    [ErrorCode.MISSING_URL_PARAM]: "/images/errors/no_url.svg",
    [ErrorCode.UNKNOWN]: "/images/errors/unknown_error.svg",
    [ErrorCode.HOST_NOT_FOUND]: "/images/errors/host_error.svg",
};

export function getFailureImage(context: LogoContext, errorCode: ErrorCode): string {
    const prefix = "https://lucky.logosear.ch";

    if (errorCode === ErrorCode.NO_LOGO_FOUND && context.basehost) {
        return `${prefix}/fallback/${context.basehost[0]}.svg`;
    }

    if (errorCode in imageMap) {
        return `${prefix}${imageMap[errorCode]}`;
    }
    return `${prefix}${imageMap[ErrorCode.UNKNOWN]}`;
}
