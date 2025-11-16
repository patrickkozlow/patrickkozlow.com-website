# Quick Start Guide

## 🚀 Ready to Push to GitHub?

Your website is now version controlled! Here's what to do next:

### 1. Create GitHub Repository (Do this once)

1. Go to: https://github.com/new
2. Repository name: `patrickkozlow.com-website`
3. Make it Public or Private
4. **Don't** initialize with README
5. Click "Create repository"

### 2. Connect and Push (Run these commands)

```powershell
cd C:\Users\Patrick\patrickkozlow.com-website

# Add your GitHub repository
git remote add origin https://github.com/patrickkozlow/patrickkozlow.com-website.git

# Push your code
git push -u origin main
```

You'll be prompted to sign in to GitHub - follow the authentication flow.

### 3. Make Changes (Daily workflow)

```powershell
# Edit your files (HTML, CSS, images, etc.)

# Commit changes
git add .
git commit -m "Updated about section"
git push

# Deploy to S3 to make it live
.\deploy.ps1
```

## 📁 What's in Your Repository

- `index.html` - Your main website
- `images/` - All your photos
- `assets/` - CSS, JavaScript, fonts
- `deploy.ps1` - Deployment script for Windows
- `deploy.sh` - Deployment script for Mac/Linux
- `README.md` - Full documentation
- `.gitignore` - Files to exclude from Git

## 🌐 Your Current Setup

✅ Website is live at: https://patrickkozlow.com  
✅ Hosted on: AWS S3 (us-west-2)  
✅ DNS: Route53  
✅ Git initialized and ready  
⏳ Next: Push to GitHub (see above)

## 💡 Key Commands

| Command | Purpose |
|---------|---------|
| `git status` | See what files changed |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Save changes |
| `git push` | Upload to GitHub |
| `.\deploy.ps1` | Deploy to S3 |
| `git log` | See commit history |

## 🆘 Need Help?

See `GITHUB_SETUP.md` for detailed instructions and troubleshooting.

