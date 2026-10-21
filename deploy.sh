#!/bin/bash
# Manual deploy (Mac/Linux). Normally pushing to main deploys via GitHub Actions.
# Usage: ./deploy.sh

BUCKET_NAME="patrickkozlow.com"
REGION="us-west-2"

python3 build.py || exit 1

echo "Deploying website to S3 bucket: $BUCKET_NAME"

aws s3 sync dist s3://$BUCKET_NAME --region $REGION --delete

if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    echo "Website is live at: https://patrickkozlow.com"
else
    echo "Deployment failed!"
    exit 1
fi
