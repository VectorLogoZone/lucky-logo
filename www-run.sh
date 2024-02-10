#!/bin/bash
#
# run just the static stuff locally
#
jekyll serve \
    --watch \
	--destination dist \
    --source docs \
    --port 5000 \
