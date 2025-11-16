# Quick Deployment Reference

## 🎯 Once Set Up - Your New Workflow

```powershell
# 1. Make your website changes

# 2. Test locally (open index.html)

# 3. Commit and push
git add .
git commit -m "Your change description"
git push

# ✅ That's it! GitHub Actions deploys automatically!
```

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| Live Website | https://patrickkozlow.com |
| GitHub Repo | https://github.com/patrickkozlow/patrickkozlow.com-website |
| Deployment Status | https://github.com/patrickkozlow/patrickkozlow.com-website/actions |
| AWS S3 Console | https://us-west-2.console.aws.amazon.com/s3/buckets/patrickkozlow.com |
| AWS IAM Console | https://console.aws.amazon.com/iam/ |

## ⚙️ One-Time Setup Checklist

If you haven't set up automated deployment yet:

- [ ] Create IAM user `github-actions-s3-deploy` in AWS
- [ ] Attach S3 policy to the IAM user
- [ ] Generate AWS access keys
- [ ] Add `AWS_ACCESS_KEY_ID` to GitHub Secrets
- [ ] Add `AWS_SECRET_ACCESS_KEY` to GitHub Secrets
- [ ] Test by pushing a commit

**Detailed instructions**: See [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)

## 🚨 Quick Troubleshooting

### Deployment Failed?
1. Check GitHub Actions tab for error logs
2. Verify GitHub Secrets are set correctly
3. Ensure IAM user has proper permissions

### Changes Not Showing?
1. Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
2. Check deployment completed successfully in Actions tab
3. Verify files in S3 console

### Need Manual Deployment?
```powershell
.\deploy.ps1
```

## 📊 Deployment Takes

**Normal deployment time**: 30-60 seconds from push to live

## 🔐 Security Reminder

- ✅ AWS credentials stored securely in GitHub Secrets
- ⚠️ Never commit AWS credentials to repository
- 🔄 Rotate access keys every 90 days (best practice)

---

**For detailed information**: See [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)

