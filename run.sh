#!/usr/bin/env bash
#
# script to run on localhost
#


jekyll build --source docs --destination dist

if [ -f ".env" ]; then
    echo "INFO: loading .env"
    export $(cat .env)
fi

npx wrangler pages dev dist \
    --live-reload \
    --compatibility-flags="nodejs_compat" \
    --compatibility-date=2023-10-30 \
    --port=4000 \
    --env dev \
    --binding FORCE_HOST="localhost:4000" \
    --kv=CACHE

