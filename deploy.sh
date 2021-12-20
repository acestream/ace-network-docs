#!/bin/bash -e

CURDIR=$(readlink -f $(dirname $0))
PATH_PRODUCTION="63db9820"
PATH_STAGING="er78njxf"

TARGET=$1

if [ "$TARGET" = "production" ]; then
    DEPLOY_PATH=$PATH_PRODUCTION
elif [ "$TARGET" = "staging" ]; then
    DEPLOY_PATH=$PATH_STAGING
else
    echo "Usage: ./deploy.sh TARGET (production|staging)"
    exit
fi

${CURDIR}/build.sh

# Copy robots.txt
rsync -a ${CURDIR}/robots.txt ${CURDIR}/site/

source ${CURDIR}/deploy.config

DEPLOY_DEST=${TARGET_HOST}:${TARGET_PATH}/${DEPLOY_PATH}
echo "Deploy to ${DEPLOY_DEST}"
rsync -a --delete ${CURDIR}/site/ ${DEPLOY_DEST}

echo "Done"
