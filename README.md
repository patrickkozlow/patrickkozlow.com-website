# Patrick Kozlow Portfolio Website

This repository contains the source code for [patrickkozlow.com](https://patrickkozlow.com), a personal portfolio website hosted on AWS S3 with Route53 DNS.

## 🌐 Live Website

**URL**: [https://patrickkozlow.com](https://patrickkozlow.com)

## 📋 Overview

This is a static website built with HTML, CSS, and JavaScript, showcasing:
- Professional experience as a Data Engineer and Machine Learning Engineer
- Technical skills and certifications
- Project portfolio
- Publications and research work
- Contact information

## 🏗️ Architecture

- **Hosting**: AWS S3 (Static Website Hosting)
- **DNS**: AWS Route53
- **Region**: us-west-2 (Oregon)
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions (Automated Deployment)
- **Deployment**: AWS CLI sync via GitHub Actions

## 🚀 Automated Deployment Workflow

### ✨ Automatic Deployment with GitHub Actions

This repository uses **GitHub Actions** for automatic deployment to AWS S3!

**Simple Workflow:**
1. Make changes to your website
2. Commit and push to GitHub
3. GitHub Actions automatically deploys to S3
4. Your website is live!

```powershell
# Make your changes
git add .
git commit -m "Updated portfolio"
git push
# That's it! Deployment happens automatically 🎉
```

### 📋 Initial Setup Required (One-Time)

To enable automated deployment, you need to configure AWS credentials in GitHub Secrets.

**See the detailed setup guide**: [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)

**Quick steps:**
1. Create AWS IAM user for GitHub Actions
2. Generate access keys
3. Add keys to GitHub Secrets (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`)
4. Push to main branch - deployment happens automatically!

### 📊 Monitor Deployments

View deployment status and history:
- **GitHub Actions**: https://github.com/patrickkozlow/patrickkozlow.com-website/actions

### 🔧 Manual Deployment (Fallback)

If needed, you can still deploy manually using the deployment scripts:

**On Windows (PowerShell):**
```powershell
.\deploy.ps1
```

**On Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### What Automated Deployment Does

The GitHub Actions workflow:
- Triggers automatically on push to `main` branch
- Syncs all website files to the S3 bucket `patrickkozlow.com`
- Deletes obsolete files from S3 (keeps bucket clean)
- Excludes Git and development files
- Provides deployment logs and notifications
- Can be manually triggered from GitHub Actions tab

## 📁 Project Structure

```
patrickkozlow.com-website/
├── index.html              # Main homepage
├── IoTStream.html         # IoT streaming project page
├── assets/                # CSS, JavaScript, fonts
│   ├── css/
│   ├── js/
│   ├── sass/
│   └── webfonts/
├── images/                # Images and photos
├── html5up-miniport/      # Template backup/reference
├── .gitignore            # Git ignore rules
├── deploy.ps1            # Windows deployment script
├── deploy.sh             # Mac/Linux deployment script
└── README.md             # This file
```

## 🔧 AWS Configuration

### S3 Bucket Settings

- **Bucket Name**: `patrickkozlow.com`
- **Region**: `us-west-2`
- **Static Website Hosting**: Enabled
- **Index Document**: `index.html`
- **Public Access**: Enabled (for website hosting)

### Route53 Settings

- **Domain**: patrickkozlow.com
- **Record Type**: A record (Alias to S3 bucket)
- **Hosted Zone**: Configured for patrickkozlow.com

## 🛠️ Development

### Testing Locally

Simply open `index.html` in your web browser to preview changes before deploying.

### Making Updates

1. Update the relevant HTML, CSS, or JavaScript files
2. Test locally
3. Commit to Git
4. Deploy to S3 using the deployment script

## 📝 Template Attribution

This website uses the "Miniport" template by HTML5 UP:
- **Template**: Miniport by HTML5 UP
- **License**: Creative Commons Attribution 3.0 (CCA 3.0)
- **Website**: https://html5up.net

## 🔐 AWS Credentials

**Important**: Never commit AWS credentials to Git!

Your AWS credentials should be configured locally using:
```bash
aws configure
```

This stores credentials in `~/.aws/credentials` (Mac/Linux) or `%USERPROFILE%\.aws\credentials` (Windows).

## 📞 Contact

**Patrick Kozlow**
- Website: [https://patrickkozlow.com](https://patrickkozlow.com)
- LinkedIn: [Patrick Kozlow](https://www.linkedin.com/in/patrick-kozlow-m-sc-p-eng-927bb882/)
- GitHub: [@patrickkozlow](https://github.com/patrickkozlow)

## 📄 License

Website content © 2024 Patrick Kozlow. All rights reserved.

Template: CCA 3.0 License (HTML5 UP)

