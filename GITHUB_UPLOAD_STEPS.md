# Step-by-Step Guide: Upload Project to GitHub

## Prerequisites
- Git installed on your computer
- GitHub account created

---

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `ecommerce` (or your preferred name)
   - **Description**: "E-commerce platform with React frontend and Node.js backend"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

---

## Step 2: Open Terminal/Command Prompt

1. Open **PowerShell** or **Command Prompt**
2. Navigate to your project folder:
   ```bash
   cd D:\Ecommerce
   ```

---

## Step 3: Initialize Git Repository

Run these commands one by one:

```bash
# Initialize git repository
git init

# Check git status
git status
```

---

## Step 4: Add All Files to Git

```bash
# Add all files to staging area
git add .

# Check what will be committed
git status
```

---

## Step 5: Create First Commit

```bash
# Create your first commit
git commit -m "Initial commit: E-commerce platform with React and Node.js"
```

---

## Step 6: Connect to GitHub Repository

After creating the repository on GitHub, you'll see a page with setup instructions. Copy the repository URL (it looks like: `https://github.com/yourusername/ecommerce.git`)

Then run:

```bash
# Add remote repository (replace with your actual GitHub URL)
git remote add origin https://github.com/yourusername/ecommerce.git

# Verify remote was added
git remote -v
```

---

## Step 7: Push to GitHub

```bash
# Push to GitHub (first time)
git branch -M main
git push -u origin main
```

**Note**: If you're asked for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - To create one: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
  - Give it `repo` permissions
  - Copy and use it as password

---

## Step 8: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded!

---

## Future Updates (After Initial Upload)

When you make changes and want to upload them:

```bash
# Navigate to project folder
cd D:\Ecommerce

# Check what changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

## Troubleshooting

### If you get "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/ecommerce.git
```

### If you get authentication errors
- Make sure you're using a Personal Access Token, not your password
- Or use GitHub Desktop app for easier authentication

### If you want to exclude certain files
- They should already be in `.gitignore`
- If not, add them to `.gitignore` and run:
  ```bash
  git rm --cached filename
  git commit -m "Remove file from tracking"
  ```

---

## Quick Command Summary

```bash
cd D:\Ecommerce
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ecommerce.git
git branch -M main
git push -u origin main
```

Replace `yourusername` with your actual GitHub username!

