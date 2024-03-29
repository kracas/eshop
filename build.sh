#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

cd ~/store/storefront

tar -xzf storefront.tar.gz || exit 1
printf -v date '%(%Y%m%d%H%M)T\n' -1 
mv storefront ./releases/`echo $date` || exit 1
ln -sfn `echo $PWD`/config/.env ./releases/`echo $date`/.env || exit 1
cd ./releases/`echo $date` || exit 1

yarn

if [ "$?" != "0" ] ; then
        echo
        echo "ERROR: Execution failed."
        cd ..
        rm -rf `echo $date`
        exit 1
fi

yarn build

if [ "$?" != "0" ] ; then
        echo
        echo "ERROR: Execution failed."
        cd ..
        rm -rf `echo $date`
        exit 1
fi

crontab -r
set -o allexport && source .env && set +o allexport && 
(crontab -l ; printf "0 */25 * * * curl -i -X GET \"https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$NEXT_PUBLIC_INSTAGRAM_TOKEN\"
") | crontab -

cd ..
ln -sfn `echo $PWD`/`echo $date` ../current

pm2 reload storefront --update-env

if [ $(ls -1 | wc -l) -gt 3 ] ; then
        find . -maxdepth 1 -printf '%T+ %p\n' | sort  | head -n 1 | awk '{print $NF}' | xargs rm -r
fi