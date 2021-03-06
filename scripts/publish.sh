set -e

username_expected="ericcarraway"
username_actual=$(npm whoami)
package_name="@ericcarraway/css-classname-hash"

registry_expected="https://registry.npmjs.org/"
registry_actual=$(npm config get registry)

npm run lint
npm run build
npm run test

echo "publishing $package_name ..."

# verify that I'm logged in to the correct account
if [ "$username_actual" != $username_expected ]; then
  echo "publish.sh must be run as user: $username_expected"
  echo "you are currently $username_actual"

  exit 255
fi

# verify that I'm using the correct registry
if [ "$registry_actual" != $registry_expected ]; then
  echo "publish.sh must be run with registry: $registry_expected"
  echo "your current registry is $registry_actual"

  exit 255
fi

echo "OK"

# because this is a scoped package,
# we need to slightly adjust
# the `npm publish` command
npm publish --access public

# EXPECT:
#   "This operation requires a one-time password."
#   "Enter OTP:"

echo "- - -"
echo "https://www.npmjs.com/package/$package_name"
