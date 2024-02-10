# Lucky Logo

Gets the logo for a URL

- [x] `/logo?url=` returns a logo: the actual bytes or a redirect - appropriate for an img src=
- [ ] provinence: rootfavicon
- [ ] `/api.json?url=` returns map of various logo URLs it finds
- [ ] `/test.html` form: shows all logos that it finds
- [ ] `/recent.html` recent results
- [ ] `/fallback/*` fallback images
- [ ] `/alternatives.html` competitors

## Cache structure

- requested URL (key)
- provinence of icon (enum below)
- URL of icon
- content type
- bytes of icon

Separate cache of page contents:
- key: url
- value: HTML contents (max N kb)

API should not use cache

## Provinence

How we found the image. Used as key for API results map

- [x] rootfavicon
- provinence: vectorlogozone
- provinence: BIMI
- provinence: headerfavicon
- provinence: header:* - Apple/OG/etc images specified in header

## Fun

- sad emoji for the fallback images
- variations of "I'm feeling lucky" for the home page button

## Future

- check that rootfavicon exists
- option of redirect vs content
- option to specify fallback image
- system fallbacks: map of regex to image url
- validate image file format
- extract png from ico
- specify size (to get closest raster if no svg)
- cache option: memory
- cache option: disk
- cache option: redis
- option: specify order of provinences

## Open

- prevent denial-of-service/overuse