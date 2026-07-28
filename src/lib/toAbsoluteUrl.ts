export function toAbsoluteUrl(relative: string, base: string): string {
    const url = new URL(relative, base);
    return url.toString();
}