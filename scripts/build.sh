set -e

npx tsc --project .

mkdir -p dist

mv index.js dist/
mv index.d.ts dist/

npm run prettier
