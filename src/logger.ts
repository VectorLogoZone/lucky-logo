import pino from 'pino';

const isServer = typeof window === "undefined";

export const logger = pino(
    {
        level: process.env.LOG_LEVEL || "info",
        timestamp: pino.stdTimeFunctions.isoTime,
    }, // If we are in Vite/browser/SSR environments, use a compatible writable stream
    (() => {
        if (!isServer) return undefined; // In the browser, fall back to default console behavior

        // In Astro Dev mode / Vite, fall back to safe console logging to avoid the SonicBoom crash
        if (process.env.NODE_ENV === "development") {
            return {
                write: (msg) => console.log(msg.trim()),
            };
        }

        // In Production Server SSR, use Pino's blazing fast standard destination
        return pino.destination(1);
    })(),
);
