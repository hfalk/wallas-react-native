#!/usr/bin/env bash

pwd
ls
echo 'API_USERNAME='$API_USERNAME''
echo 'API_TOKEN='$API_TOKEN''

{
  echo 'API_USERNAME='$API_USERNAME''
  echo 'API_TOKEN='$API_TOKEN''
} >.env
