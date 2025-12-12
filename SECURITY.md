# Security Guide

## ⚠️ IMPORTANT: Credentials Were Exposed

If you've already pushed this repository to GitHub with hardcoded credentials, **immediate action is required**:

### Immediate Actions Required:

1. **Change Your Gmail App Password**:
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification → App passwords
   - Revoke the old app password that was exposed
   - Generate a new app password
   - Update it in your `server/.env` file

2. **Regenerate Razorpay Keys**:
   - Log in to your Razorpay Dashboard
   - Go to Settings → API Keys
   - Revoke the exposed test/live keys
   - Generate new API keys
   - Update them in your `client/.env` file

3. **Change Database Password** (if applicable):
   - If your database password was exposed, change it immediately
   - Update it in your `server/.env` file

4. **Remove Credentials from Git History** (Advanced):
   - The credentials are still in your Git history even after removing them from code
   - Consider using tools like `git-filter-branch` or BFG Repo-Cleaner to remove them
   - **Warning**: This rewrites history and requires force push. Only do this if you understand the implications.

### Best Practices Going Forward:

1. **Never commit `.env` files**:
   - `.env` files are already in `.gitignore`
   - Always use `.env.example` files as templates
   - Double-check before committing: `git status` should not show `.env` files

2. **Use Environment Variables**:
   - All sensitive data should be in environment variables
   - Never hardcode passwords, API keys, or secrets in source code

3. **Review Before Committing**:
   - Use `git diff` to review changes before committing
   - Look for any hardcoded credentials or sensitive information

4. **Use Different Credentials for Development and Production**:
   - Never use production credentials in development
   - Use test API keys for development

5. **Regular Security Audits**:
   - Regularly rotate passwords and API keys
   - Review your codebase for any accidentally committed secrets
   - Use tools like `git-secrets` or `truffleHog` to scan for secrets

### If Credentials Are Already on GitHub:

1. **Immediately revoke and regenerate** all exposed credentials
2. **Consider making the repository private** if it's currently public
3. **Review GitHub's security advisories** for your repository
4. **Monitor for unauthorized access** to your accounts

### Environment Variables Setup:

1. Create `server/.env` from `server/.env.example`
2. Create `client/.env` from `client/.env.example`
3. Fill in your actual credentials
4. **Never commit these files**

### Additional Security Measures:

- Enable 2FA on all accounts (Gmail, Razorpay, GitHub)
- Use strong, unique passwords
- Regularly update dependencies: `npm audit fix`
- Keep your Node.js and MySQL versions updated
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Validate and sanitize all user inputs
- Use prepared statements for database queries (already implemented)

---

**Remember**: Security is an ongoing process. Stay vigilant and regularly review your security practices.

