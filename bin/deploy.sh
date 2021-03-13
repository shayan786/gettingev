#!/bin/bash

INSTANCE="192.241.200.73"

echo "Deploy to $INSTANCE"

echo "SSH to Instance"
ssh root@$INSTANCE <<EOF1

echo "Change directory"
cd appd-research-poc/

echo "Pull from repo"
git pull

echo "Install any new packages"
sudo npm i

echo "Building..."
npm run build

echo "Remove old dist"
sudo rm -r /usr/share/nginx/appd-research-poc/*

echo "Copy to nginx dist path"
sudo cp -r ./build/* /usr/share/nginx/appd-research-poc/

echo "Restarting nginx"
sudo service nginx restart

exit

EOF1