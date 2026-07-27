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

echo "INFO: Starting development server..."
npm run dev

