#!/bin/sh

# Rename .js files to .cjs
rename -S .js .cjs dist/cjs/**
sed -i '' 's/\.js"/\.cjs"/g' dist/cjs/index.cjs
