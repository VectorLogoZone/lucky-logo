#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail


if [ -f ".env" ]; then
    echo "INFO: loading .env"
    export $(cat .env | xargs)
else
    echo "WARNING: No .env file found."
fi

if [ ! -d "node_modules" ]; then
    echo "INFO: Installing dependencies..."
    npm install
fi

export LASTMOD=$(date -u +%Y-%m-%dT%H:%M:%SZ)
if [[ $(git status --short) != '' ]]; then
  export COMMIT="$(git rev-parse --short HEAD) (dirty)"
else
  export COMMIT="$(git rev-parse --short HEAD)"
fi

echo "INFO: Starting development server..."
npm run dev

