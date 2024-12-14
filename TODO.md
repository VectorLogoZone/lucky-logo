# Lucky Logo

Gets the logo for a URL

- [ ] build queue of additional lookups: social links, news feeds, title (for kg), website (for links from feed)
- [ ] [WikiData](https://stackoverflow.com/questions/40478860/how-to-get-social-media-links-from-google-knowledge/40762359#40762359) as source
- [ ] timeouts on all fetches
- [ ] timeouts on DNS lookups
- [ ] custom user-agent on fetches
- [ ] more info from fetches: contentType, contentLength, sniffType, width/height, etc
- [ ] change contribution: none
- [ ] wrap `fetch()` calls: `loadUrl()`
- [ ] global settings: from `docs/_config.yaml`
- [ ] support for `LOG_LEVEL`
- [ ] figure out `Response.redirect` for local urls
- [ ] script to generate a list of URLs from the top N websites
- [ ] errors: enum of custom type
- [ ] errors: include an emoji fallback image for each error
- [ ] `/errors.html` - display each error with description, how-to-fix, image
- [ ] `/recent.html` recent results
- [ ] note about `referrerpolicy=origin`
- [ ] `/users.html` - recent users from referrers

## provenances

- [ ] atom
- [ ] rss
- [ ] vectorlogozone
- [ ] wikipedia
- [ ] schema.org metadata

## Cache structure

- requested URL (key)
- provenance of icon (enum below)
- URL of icon
- content type
- bytes of icon

Separate cache of page contents:
- key: url
- value: HTML contents (max N kb)
- this may be handled by Cloudflare `fetch()` caching

- cache option: Cloudflare KV
- cache option: memory
- cache option: disk
- cache option: redis
- option to bypass cache

## Future

- toggle for withBackground css class
- home page clickable image: go to website (not image) for samples
- handle `data:` URLs
- option of redirect vs content
- option to specify fallback image
- option to verify existance before redirecting
- option to validate image file format
- option to specify order of provenances
- option to allow non-square logos
- extract png from ico [icojs](https://www.npmjs.com/package/icojs)
- specify size (to get closest raster if no svg)
- system fallbacks: map of regex to image url

## Open

- prevent denial-of-service/overuse
