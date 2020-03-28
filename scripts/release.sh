#!/bin/sh

set -e

PKG_VERSION=$(jq -r '.version' package.json)

git fetch origin v"$PKG_VERSION" || {
  type standard-version || npm i -g standard-version
  standard-version --skip.changelog -a --release-as "$PKG_VERSION"
  git push --follow-tags origin master && npm publish --registry https://registry.npmjs.org/
}
