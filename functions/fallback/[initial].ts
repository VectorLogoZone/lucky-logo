import { PagesFunction } from "@cloudflare/workers-types";

export async function onRequest(pageContext: PagesFunction) {

    let initial = pageContext.params.initial;
    if (!initial) {
        initial = "?"
    } else if (initial.length > 1) {
        initial = initial[0];
    }
    initial = initial.toUpperCase();

    const xml = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<style>
text { font-size: 256pt; font-family: sans-serif;}
</style>
    <circle cx="256" cy="256" r="256" fill="#009e60"/>
    <text fill="#ffffff" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${initial}</text>
</svg>
`;


    return new Response(xml, {
        headers: {
            "Cache-Control": "public",
            "Content-Type": "image/svg+xml",
        },
    });
}
