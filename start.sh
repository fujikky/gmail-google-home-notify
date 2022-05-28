#!/bin/bash -eu

BASEDIR=$(cd $(dirname $0) && pwd)

cd $BASEDIR
yarn start >> /var/log/home-notify.log 2>&1
