# Manual deploy (Windows). Normally pushing to main deploys via GitHub Actions.
# Usage: .\deploy.ps1

$BUCKET_NAME = "patrickkozlow.com"
$REGION = "us-west-2"

python build.py
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Deploying website to S3 bucket: $BUCKET_NAME" -ForegroundColor Green

aws s3 sync dist s3://$BUCKET_NAME --region $REGION --delete

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Website is live at: https://patrickkozlow.com" -ForegroundColor Cyan
} else {
    Write-Host "Deployment failed!" -ForegroundColor Red
    exit 1
}
