# To Do

## Additional sources

- [ ] Scrape for social media links and get their logos
- [ ] Scrape RSS/Atom feed links and get images they link to
- [ ] Get every image on the page
- [ ] [WikiData](https://stackoverflow.com/questions/40478860/how-to-get-social-media-links-from-google-knowledge/40762359#40762359) as source
- [ ] [LogoSearch](https://logosear.ch/)

## General

- [ ] is GKG working?
- [ ] compare: drop-down for who to compare against (with "all" option)
- [ ] analyze: I'm feeling lucky button for a random site
- [ ] separate page to analyze feeds
- [ ] timeouts on all fetches
- [ ] timeouts on DNS lookups
- [ ] APIs
- [ ] custom user-agent on fetches
- [ ] more info from fetches: contentType, contentLength, sniffType, width/height, etc
- [ ] random site for single test
- [ ] wrap `fetch()` calls: `loadUrl()`
- [ ] figure out `Response.redirect` for local urls
- [ ] `/recent.html` recent results
- [ ] note about `referrerpolicy=origin`
- [ ] `/users.html` - recent referrers
- [ ] prevent denial-of-service/overuse

## Caching

- key: requested URL (or canonicalized version of it?)
- data
    - provenance
    - image URL
    - content type
    - raw bytes (or not?)
- pluggable providers

## Future

- configurable (or at least overridable) error/fallback images
- configurable DNS provider
- Dockerfile version (or at least instructions for one)
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


