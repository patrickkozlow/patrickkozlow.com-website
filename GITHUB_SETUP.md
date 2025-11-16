# GitHub Setup Guide

Follow these steps to push your website to GitHub:

## Step 1: Create a New Repository on GitHub

1. Go to GitHub: https://github.com/patrickkozlow
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `patrickkozlow.com-website` (or your preferred name)
   - **Description**: "Portfolio website hosted on AWS S3"
   - **Visibility**: Choose "Public" or "Private"
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you instructions. You'll need the repository URL.

Run these commands in PowerShell (from the website directory):

```powershell
# Navigate to the website directory (if not already there)
cd C:\Users\Patrick\patrickkozlow.com-website

# Set the main branch name (if needed)
git branch -M main

# Add the GitHub repository as remote origin
# Replace YOUR_GITHUB_USERNAME with 'patrickkozlow'
# Replace REPO_NAME with the repository name you chose
git remote add origin https://github.com/patrickkozlow/REPO_NAME.git

# Push your code to GitHub
git push -u origin main
```

**Example with actual values:**
```powershell
git remote add origin https://github.com/patrickkozlow/patrickkozlow.com-website.git
git push -u origin main
```

## Step 3: Authenticate with GitHub

When you run `git push` for the first time, you may be prompted to authenticate:

### Option A: GitHub Personal Access Token (Recommended)
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with "repo" scope
3. Use the token as your password when prompted

### Option B: GitHub Desktop
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Use it to push the repository

### Option C: SSH Key (Most Secure)
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add key to ssh-agent: `ssh-add ~/.ssh/id_ed25519`
3. Copy public key: `cat ~/.ssh/id_ed25519.pub`
4. Add to GitHub: Settings → SSH and GPG keys → New SSH key
5. Use SSH URL instead: `git remote set-url origin git@github.com:patrickkozlow/REPO_NAME.git`

## Step 4: Verify Setup

After pushing, verify:
1. Go to your GitHub repository URL
2. You should see all your website files
3. The README.md should be displayed on the main page

## Future Workflow

Now that everything is set up, your workflow is:

1. **Make changes locally** (edit HTML, CSS, images, etc.)
2. **Test locally** (open index.html in browser)
3. **Commit to Git**:
   ```powershell
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub**:
   ```powershell
   git push
   ```
5. **Deploy to AWS S3**:
   ```powershell
   .\deploy.ps1
   ```

## Troubleshooting

### "Permission denied" error
- Make sure you're authenticated with GitHub (see Step 3)
- Try using a Personal Access Token

### "Remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/patrickkozlow/REPO_NAME.git
```

### Check current remote
```powershell
git remote -v
```

## Additional Resources

- GitHub Docs: https://docs.github.com/
- Git Documentation: https://git-scm.com/doc
- AWS CLI S3 Sync: https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html

