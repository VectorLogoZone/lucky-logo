import type { APIContext } from "astro";

type APIProps = Record<string, unknown>;
type APIParams = Record<string, string | undefined>;

export type AstroContext = APIContext<APIProps, APIParams>;
