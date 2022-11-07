#!/bin/zsh

sh rollup.sh
# node ./incrementVersion.cjs
sh prepublishCommit.sh
# npm publish --access=public