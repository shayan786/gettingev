#!/bin/bash

INSTANCE="192.241.200.73"

echo "Deploy to $INSTANCE"

echo "SSH to Instance"
ssh root@$INSTANCE <<EOF1

echo "Change directory"
cd gettingev/

echo "Pull from repo"
git pull

echo "Install any new packages"
sudo yarn install

echo "Building..."
yarn build

echo "Remove old dist"
sudo rm -r /var/www/gettingev.com/html/*

echo "Copy to nginx dist path"
sudo cp -r ./build/* /var/www/gettingev.com/html

echo "Restarting nginx"
sudo service nginx restart

exit

EOF1