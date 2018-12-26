#!/usr/bin/env bash

{
  echo "API_USERNAME='$API_USERNAME'"
  echo "API_TOKEN='$API_TOKEN'"
} >.env

echo '{"app_secret": "'$APP_CENTER_SECRET_ANDROID'"}' >android/app/src/main/assets/appcenter-config.json

plutil -replace AppSecret -string $APP_CENTER_SECRET_IOS ios/wallas/AppCenter-Config.plist

cat android/app/src/main/assets/appcenter-config.json
cat os/wallas/AppCenter-Config.plist
