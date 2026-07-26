export type LuckyLogoEnv = {
    ASSETS?: Fetcher;
    BUILD_COMMIT?: string;
    FORCE_HOST?: string;
    GKG_ACCESS_TOKEN?: string;
    GKG_LOCATION?: string;
    GKG_PROJECT_ID?: string;
    LOGODEV_PUBLIC_KEY?: string;
};

export type RequestContext = {
    env: LuckyLogoEnv;
    params: Record<string, string | undefined>;
    request: Request;
};

export function createRequestContext(
    request: Request,
    env: LuckyLogoEnv,
    params: Record<string, string | undefined> = {},
): RequestContext {
    return {
        env,
        params,
        request,
    };
}
