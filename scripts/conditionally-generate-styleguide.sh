#!/bin/sh

# first argument should be a git reference for comparison

CHANGED_FILE_COUNT=`git diff --name-only $1..HEAD src | grep -e '.hbs' -e '.config.js' -c`

echo "Found $CHANGED_FILE_COUNT relevant modified files since that commit. (only looking for hbs or config.js files)"

if (($CHANGED_FILE_COUNT > 0)); then
  npm run styleguide:build
else
  echo "Skipping Styleguide Build Step"
fi
