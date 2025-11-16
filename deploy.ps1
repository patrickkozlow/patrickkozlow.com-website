# Deploy script to sync local files to S3 bucket
# Usage: .\deploy.ps1

$BUCKET_NAME = "patrickkozlow.com"
$REGION = "us-west-2"

Write-Host "Deploying website to S3 bucket: $BUCKET_NAME" -ForegroundColor Green

# Sync files to S3
aws s3 sync . s3://$BUCKET_NAME --region $REGION --delete --exclude ".git/*" --exclude ".github/*" --exclude ".gitignore" --exclude "*.md" --exclude "deploy.ps1" --exclude "deploy.sh" --exclude "git-push.ps1" --exclude "html5up-miniport/*"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Website is live at: https://patrickkozlow.com" -ForegroundColor Cyan
} else {
    Write-Host "Deployment failed!" -ForegroundColor Red
    exit 1
}

