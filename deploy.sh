#!/bin/bash
# Deploy script to sync local files to S3 bucket (for Mac/Linux users)
# Usage: ./deploy.sh

BUCKET_NAME="patrickkozlow.com"
REGION="us-west-2"

echo "Deploying website to S3 bucket: $BUCKET_NAME"

# Sync files to S3
aws s3 sync . s3://$BUCKET_NAME --region $REGION --delete \
    --exclude ".git/*" \
    --exclude ".github/*" \
    --exclude ".gitignore" \
    --exclude "*.md" \
    --exclude "deploy.ps1" \
    --exclude "deploy.sh" \
    --exclude "git-push.ps1" \
    --exclude "html5up-miniport/*"

if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    echo "Website is live at: https://patrickkozlow.com"
else
    echo "Deployment failed!"
    exit 1
fi

