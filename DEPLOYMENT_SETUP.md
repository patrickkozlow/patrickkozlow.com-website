# Automated Deployment Setup Guide

This guide will help you set up automated deployment from GitHub to AWS S3 using GitHub Actions.

## 🎯 Overview

Once configured, your workflow will be:
1. Make changes to your website locally
2. Commit and push to GitHub (`git push`)
3. **GitHub Actions automatically deploys to S3** ✨
4. Your website is live at https://patrickkozlow.com

## ⚙️ One-Time Setup

### Step 1: Create AWS IAM User for GitHub Actions

You need to create a dedicated IAM user with limited permissions for GitHub Actions to use.

1. **Go to AWS IAM Console**: https://console.aws.amazon.com/iam/
2. Click **Users** → **Create user**
3. **User name**: `github-actions-s3-deploy`
4. Click **Next**
5. **Set permissions**: Choose "Attach policies directly"
6. Click **Create policy** (opens new tab)
7. Use the JSON editor and paste this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::patrickkozlow.com",
                "arn:aws:s3:::patrickkozlow.com/*"
            ]
        }
    ]
}
```

8. Click **Next**, name it `S3-patrickkozlow-deploy-policy`
9. Click **Create policy**
10. Go back to the user creation tab and refresh the policies
11. Search for and select `S3-patrickkozlow-deploy-policy`
12. Click **Next** → **Create user**

### Step 2: Generate Access Keys

1. Click on the newly created user `github-actions-s3-deploy`
2. Go to **Security credentials** tab
3. Scroll to **Access keys** section
4. Click **Create access key**
5. Select **Use case**: "Other"
6. Click **Next** → Add description: "GitHub Actions deployment"
7. Click **Create access key**
8. **⚠️ IMPORTANT**: Copy both:
   - **Access key ID** (looks like: `AKIAIOSFODNN7EXAMPLE`)
   - **Secret access key** (looks like: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`)
   
9. **⚠️ Save these securely** - you won't be able to see the secret key again!
10. Click **Done**

### Step 3: Add AWS Credentials to GitHub Secrets

1. Go to your GitHub repository: https://github.com/patrickkozlow/patrickkozlow.com-website
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add the first secret:
   - **Name**: `AWS_ACCESS_KEY_ID`
   - **Secret**: Paste the Access key ID from Step 2
   - Click **Add secret**
6. Click **New repository secret** again
7. Add the second secret:
   - **Name**: `AWS_SECRET_ACCESS_KEY`
   - **Secret**: Paste the Secret access key from Step 2
   - Click **Add secret**

### Step 4: Verify Setup

1. Make a small change to your website (e.g., edit README.md)
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Test automated deployment"
   git push
   ```
3. Go to your GitHub repository → **Actions** tab
4. You should see a workflow running called "Deploy to AWS S3"
5. Click on it to watch the deployment in real-time
6. Once complete (green checkmark ✅), visit https://patrickkozlow.com to verify

## 🚀 Daily Workflow (After Setup)

Your new simplified workflow:

```powershell
# 1. Make your changes to HTML, CSS, images, etc.
# 2. Test locally (open index.html in browser)

# 3. Commit to Git
git add .
git commit -m "Updated work experience section"

# 4. Push to GitHub - deployment happens automatically!
git push
```

That's it! No more manual `deploy.ps1` needed! 🎉

## 📊 Monitoring Deployments

### View Deployment Status
- Go to: https://github.com/patrickkozlow/patrickkozlow.com-website/actions
- See all deployment history, logs, and status

### Manual Deployment Trigger
If you need to redeploy without making changes:
1. Go to **Actions** tab
2. Click **Deploy to AWS S3** workflow
3. Click **Run workflow** → **Run workflow**

## 🔧 Advanced Configuration

### Adding CloudFront (Optional)

If you add CloudFront CDN in the future:

1. Uncomment the CloudFront invalidation section in `.github/workflows/deploy.yml`
2. Replace `YOUR_DISTRIBUTION_ID` with your CloudFront distribution ID
3. Update the IAM policy to include CloudFront permissions:

```json
{
    "Effect": "Allow",
    "Action": [
        "cloudfront:CreateInvalidation"
    ],
    "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
}
```

### Custom Domain with HTTPS

If you want HTTPS (recommended):
1. Create AWS Certificate Manager (ACM) certificate for patrickkozlow.com
2. Create CloudFront distribution pointing to your S3 bucket
3. Update Route53 to point to CloudFront instead of S3
4. Enable cache invalidation in the workflow

### Deploy to Staging Environment

To add a staging environment:
1. Create another S3 bucket (e.g., `staging.patrickkozlow.com`)
2. Modify the workflow to deploy to staging on `develop` branch
3. Deploy to production only on `main` branch

## 🛠️ Troubleshooting

### Deployment Fails with "Access Denied"
- **Issue**: AWS credentials are incorrect or lack permissions
- **Fix**: 
  - Verify GitHub Secrets are set correctly (no extra spaces)
  - Check IAM user has the correct policy attached
  - Verify S3 bucket name is correct

### Workflow Doesn't Trigger
- **Issue**: Workflow file has syntax errors
- **Fix**: 
  - Go to Actions tab and check for errors
  - Ensure `.github/workflows/deploy.yml` is properly formatted

### Changes Not Appearing on Website
- **Issue**: Browser cache or S3 cache
- **Fix**:
  - Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
  - Clear browser cache
  - Check S3 bucket to verify files were updated

### Need to Roll Back
- **Issue**: Deployed broken code
- **Fix**:
  ```powershell
  # Revert to previous commit
  git revert HEAD
  git push
  # Or checkout specific working commit
  git checkout <commit-hash>
  git push -f  # Use with caution!
  ```

## 📝 Best Practices

1. **Test Locally First**: Always preview changes in your browser before pushing
2. **Meaningful Commit Messages**: Use descriptive messages like "Updated certifications section" instead of "changes"
3. **Small, Frequent Commits**: Easier to track and revert if needed
4. **Monitor Deployments**: Check the Actions tab after pushing to ensure deployment succeeded
5. **Branch Strategy**: Consider using a `develop` branch for testing before merging to `main`

## 🔐 Security Notes

- ✅ AWS credentials are stored securely in GitHub Secrets (encrypted)
- ✅ IAM user has minimal permissions (only S3 access to your specific bucket)
- ✅ Credentials are never exposed in logs or code
- ⚠️ Never commit AWS credentials to your repository
- ⚠️ Regularly rotate AWS access keys (every 90 days recommended)

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [AWS CLI S3 Sync Reference](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)

## 🆘 Need Help?

If you encounter issues:
1. Check the Actions tab for detailed error logs
2. Review AWS CloudWatch logs
3. Verify IAM permissions
4. Ensure S3 bucket settings allow public website hosting

---

**Last Updated**: November 2024  
**Author**: Patrick Kozlow  
**Website**: https://patrickkozlow.com

