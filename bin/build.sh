#!/usr/bin/env bash
#
# build for production
#

set -o errexit
set -o pipefail
set -o nounset

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

ENV_FILE="${REPO_DIR}/.env"
if [ -f "${ENV_FILE}" ]; then
    echo "INFO: loading '${ENV_FILE}'!"
    export $(cat "${ENV_FILE}")
fi

export LASTMOD=$(date -u +%Y-%m-%dT%H:%M:%SZ)
if [[ $(git status --short) != '' ]]; then
  export COMMIT="$(git rev-parse --short HEAD) (dirty)"
else
  export COMMIT="$(git rev-parse --short HEAD)"
fi

# inject COMMIT and LASTMOD into wrangler.json
jq --arg commit "$COMMIT" --arg lastmod "$LASTMOD" '.vars = (.vars // {}) | .vars.COMMIT = $commit | .vars.LASTMOD = $lastmod' "${REPO_DIR}/wrangler.json" > "${REPO_DIR}/wrangler.json.tmp"
mv "${REPO_DIR}/wrangler.json.tmp" "${REPO_DIR}/wrangler.json"

npm run build