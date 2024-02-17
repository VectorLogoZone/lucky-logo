# Lucky Logo

Gets the logo for a URL

- [x] `/logo?url=` returns a logo: the actual bytes or a redirect - appropriate for an img src=
- [ ] fromRoot: check that it doesn't 404
- [ ] figure out `Response.redirect` for local urls
- [ ] script to generate a list of URLs from the top N websites
- [ ] `/test.html`: takes a list of urls & returns logo.  Optional additional columns for other services
- [ ] errors: enum of custom type
- [ ] errors: include an emoji fallback image for each error
- [ ] `/errors.html` - display each error with description, how-to-fix, image
- [ ] use site vars from `docs/_config.yaml`
- [ ] `/api.json?url=` returns map (or array?) of various logo URLs it finds
- [ ] `/all.html` form: shows all logos that it finds for a single site
- [ ] `/recent.html` recent results
- [ ] note about `referrerpolicy=origin`
- [ ] `/users.html` - recent users from referrers

## provenances

How we found the image. Used as key for API results map

- [x] rootfavicon
- [ ] vectorlogozone
- [ ] wikipedia
- [ ] BIMI
- [ ] headerfavicon
- [ ] header:* - Apple/OG/etc images specified in header

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
