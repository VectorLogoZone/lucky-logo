/// <reference path="../worker-configuration.d.ts" />

import type { Runtime } from '@astrojs/cloudflare';

declare global {
    namespace App {
        interface Locals extends Runtime<Env> {}
    }
}

export {};
