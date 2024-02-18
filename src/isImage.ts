import { LogoContext } from './LogoContext';

export async function isImage(lctx: LogoContext, url:string): Promise<boolean> {
    try {
        const response = await fetch(url);
        if (response.status != 200) {
            lctx.logger.warn({ status: response.status, statusText: response.statusText, url }, `isImage() HTTP error`);
            return false;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            lctx.logger.warn({ contentType, url }, `isImage() not an image`);
            return false;
        }
        //LATER: maybe check the bytes of the image to be sure it's an image?
    } catch (err: unknown) {
        lctx.logger.warn({ err, url }, `isImage() unknown error`);
        return false;
    }
    return true;
}