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
- **Deployment**: AWS CLI sync

## 🚀 Deployment Workflow

### Prerequisites

1. **AWS CLI** installed and configured
   - Download from: https://aws.amazon.com/cli/
   - Configure with: `aws configure`
   - Ensure you have credentials with S3 write permissions

2. **Git** installed
   - Download from: https://git-scm.com/

### Making Changes

1. **Edit files locally**
   ```bash
   # Make your changes to HTML, CSS, JavaScript, or images
   # Test locally by opening index.html in a browser
   ```

2. **Commit changes to Git**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push to GitHub** (optional but recommended)
   ```bash
   git push origin main
   ```

4. **Deploy to S3**
   
   **On Windows (PowerShell):**
   ```powershell
   .\deploy.ps1
   ```
   
   **On Mac/Linux:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### What the Deployment Script Does

The deployment script:
- Syncs all local files to the S3 bucket `patrickkozlow.com`
- Deletes files from S3 that no longer exist locally (keeps S3 clean)
- Excludes Git and development files (.git, .gitignore, README.md, deploy scripts)
- Uses the `us-west-2` region

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

