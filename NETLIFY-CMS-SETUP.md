# Netlify CMS Setup Guide

This guide will help you set up Netlify CMS for content editing while keeping your GitHub Pages deployment intact.

## Overview

This setup creates a **parallel deployment** on Netlify that provides a content management interface. Your content edits will be committed to GitHub, and both GitHub Pages and Netlify will serve the same content.

**Cost: 100% FREE** - Uses Netlify's free tier and GitHub's free tier.

---

## Prerequisites

- GitHub account with your repository
- Netlify account (free - sign up at https://netlify.com)
- Your repository should be public or you should have admin access

---

## Step 1: Update Configuration File

Before deploying, update the `admin/config.yml` file:

1. Open `/admin/config.yml`
2. Find this line:
   ```yaml
   repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
   ```
3. Replace with your actual GitHub username and repository name, e.g.:
   ```yaml
   repo: deborahlyon/deborah-lyon-website
   ```

---

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended for non-technical users)

1. **Log in to Netlify**
   - Go to https://app.netlify.com
   - Sign up or log in (you can use your GitHub account)

2. **Import Your Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your repository from the list

3. **Configure Build Settings**
   - **Build command:** Leave blank (no build needed)
   - **Publish directory:** `/` (root directory)
   - Click "Deploy site"

4. **Wait for Deployment**
   - Netlify will deploy your site in 1-2 minutes
   - You'll get a random URL like `https://random-name-123.netlify.app`

### Option B: Deploy via Netlify CLI (For technical users)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## Step 3: Enable Netlify Identity

Netlify Identity provides secure login for the CMS (completely free for up to 1,000 users).

1. **Enable Identity**
   - In your Netlify site dashboard, go to "Site settings"
   - Click "Identity" in the sidebar
   - Click "Enable Identity"

2. **Set Registration Preferences**
   - Under "Registration preferences", select "Invite only"
   - This prevents random people from signing up
   - Click "Save"

3. **Enable Git Gateway**
   - Scroll down to "Services" section
   - Click "Enable Git Gateway"
   - This allows the CMS to commit to your GitHub repo
   - Click "Save"

---

## Step 4: Invite Yourself (or Your Client)

1. **Send Invitation**
   - Go to the "Identity" tab in your Netlify dashboard
   - Click "Invite users"
   - Enter the email address that should have CMS access
   - Click "Send"

2. **Accept Invitation**
   - Check email for invitation from Netlify
   - Click the link in the email
   - Set a password for CMS access
   - You're now registered!

---

## Step 5: Access the CMS

1. **Go to the Admin URL**
   - Visit: `https://YOUR-NETLIFY-SITE.netlify.app/admin/`
   - Or use custom domain: `https://yourdomain.com/admin/`

2. **Log In**
   - Use the email and password you set up
   - You'll see the CMS interface with editable sections

3. **Edit Content**
   - Click any section (Hero, About, Opening Hours, Gallery)
   - Make your changes
   - Click "Save" then "Publish"
   - Changes are committed to GitHub automatically

---

## Step 6: Verify GitHub Pages Still Works

1. **Check GitHub Pages URL**
   - Your site should still be live at your GitHub Pages URL
   - Example: `https://username.github.io/repo-name/`

2. **Wait for Changes to Sync**
   - When you publish changes via Netlify CMS, they go to GitHub
   - GitHub Pages rebuilds automatically (takes 1-2 minutes)
   - Both Netlify and GitHub Pages will show the updated content

---

## How to Edit Content

### Editing Hero Section
1. Log in to `/admin/`
2. Click "Site Settings" → "Hero Section"
3. Edit the main heading, subheading, or button text
4. Click "Publish" to save

### Editing About Section
1. Click "Site Settings" → "About Section"
2. Edit the bio paragraphs (supports multiple paragraphs)
3. Update the profile image if needed
4. Click "Publish"

### Editing Opening Hours
1. Click "Site Settings" → "Opening Hours"
2. Edit days and times
3. Add or remove days using the "+" and "−" buttons
4. Click "Publish"

### Managing Gallery Images
1. Click "Gallery Images" in the sidebar
2. Click "New Gallery Images" to add an image
3. Upload image, add alt text, and set order number
4. Click "Publish"
5. To edit/delete: click on an existing gallery image entry

---

## Important Notes

### GitHub Pages vs Netlify
- **GitHub Pages**: Your production site (can use custom domain)
- **Netlify**: CMS editing interface + alternative hosting
- Both serve the same content from the same GitHub repo

### Content Changes Flow
```
Edit in Netlify CMS → Save → Commit to GitHub → GitHub Pages rebuilds
                                              ↓
                                        Netlify rebuilds
```

### Free Tier Limits
- **Netlify**:
  - 100 GB bandwidth/month (plenty for most sites)
  - 300 build minutes/month
  - 1,000 Identity users
- **GitHub Pages**:
  - 100 GB bandwidth/month
  - No build limits for static sites

### Using a Custom Domain
If you want to use your own domain with the CMS:

1. Point your domain to Netlify (or keep it on GitHub Pages)
2. In Netlify: "Domain settings" → "Add custom domain"
3. Follow Netlify's DNS instructions
4. Access CMS at: `https://yourdomain.com/admin/`

---

## Troubleshooting

### "Login with GitHub" button doesn't work
- Make sure you enabled Git Gateway in Step 3
- Check that you accepted the email invitation
- Try logging out and back in

### Changes don't appear on GitHub Pages
- Wait 2-3 minutes for GitHub Pages to rebuild
- Check GitHub Actions tab to see if build succeeded
- Clear your browser cache

### CMS says "Config Error"
- Verify you updated `admin/config.yml` with correct repo name
- Check that the file is committed to GitHub
- Redeploy Netlify site

### Can't upload images
- Check that `img/gallery/` folder exists in your repo
- Verify file size is under 10MB
- Try refreshing the CMS page

### Content doesn't load on the site
- Make sure you pushed the `/content/` folder to GitHub
- Check browser console for JavaScript errors
- Verify JSON files are valid

---

## Security Best Practices

1. **Never share your CMS password**
2. **Keep "Invite only" registration enabled**
3. **Remove users who no longer need access** (Identity tab → Delete user)
4. **Use a strong password** for CMS access
5. **Enable two-factor authentication** on your GitHub account

---

## For Non-Technical Users: Quick Reference

**To edit your website:**
1. Go to `https://YOUR-SITE.netlify.app/admin/`
2. Log in with your email and password
3. Click the section you want to edit
4. Make changes
5. Click "Publish"
6. Wait 2 minutes for changes to appear

**Need help?** Contact your web developer with:
- What you were trying to do
- What happened instead
- Screenshot of any error messages

---

## Next Steps

### Optional Enhancements

1. **Add more editable sections**
   - Edit `admin/config.yml` to add services, testimonials, etc.

2. **Custom domain**
   - Set up your own domain in Netlify dashboard

3. **Email notifications**
   - Get notified when content is published (Netlify settings)

4. **Multiple users**
   - Invite team members via Identity tab

5. **Content preview**
   - Configure preview templates in `admin/config.yml`

---

## File Structure Overview

```
your-repo/
├── admin/
│   ├── config.yml          # CMS configuration
│   └── index.html          # CMS interface
├── content/
│   ├── hero.json           # Hero section text
│   ├── about.json          # About section text
│   ├── hours.json          # Opening hours
│   └── gallery/            # Gallery image metadata
│       ├── image-1.md
│       └── image-2.md
├── img/                    # Your existing images
│   ├── gallery/            # Gallery photos
│   └── ...
├── index.html              # Main website (modified)
└── NETLIFY-CMS-SETUP.md    # This guide
```

---

## CSS Preview in CMS

The CMS preview pane shows your content with **your actual website styles** applied. This is accomplished through:

### How It Works

1. **`admin/preview-templates.js`** registers your CSS:
   ```javascript
   CMS.registerPreviewStyle("../style.css");
   ```

2. **Custom preview templates** render content with your CSS classes:
   - About section uses `.about-content`, `.about-image`, `.about-text`
   - Services use `.card`, `.service-card`, `.service-content`
   - Reviews use `.reviews__item`, `.reviews__author`, `.bg-mid`
   - Hero uses `.hero`, `.hero__quote`
   - Benefits use `.benefits__grid`, `.benefits__list`, `.tick-list`
   - And more...

### What You'll See

When editing content, the preview pane displays:
- ✅ All color schemes (`--mauve`, `--cream`, `--light-cream`)
- ✅ Proper fonts and spacing
- ✅ Button styles (`.btn`, `.btn--inverted`, `.btn--small`)
- ✅ Helper classes (`.bg-brand`, `.bg-light`, `.bg-mid`)
- ✅ BEM classes (`.benefits__grid`, `.reviews__item`, etc.)
- ✅ Grid layouts and responsive design

### Technical Details

**Files involved:**
- `admin/preview-templates.js` - Preview template definitions
- `admin/index.html` - Loads the preview templates script
- `style.css` - Your site's CSS (automatically loaded into preview)

**Preview templates available for:**
- Hero Section
- About Section
- Services
- Client Testimonials
- Benefits Section
- Book Now CTAs
- Contact Information
- Gift Panel
- Gallery Images
- Professional Memberships

### Updating Preview Templates

If you modify your CSS or HTML structure:

1. Update `admin/preview-templates.js` to match new class names
2. Ensure preview HTML uses the same BEM conventions
3. Test by editing content in `/admin/` and checking preview

---

## Support Resources

- **Netlify CMS Docs**: https://www.netlifycms.org/docs/
- **Netlify Support**: https://answers.netlify.com/
- **Netlify Identity**: https://docs.netlify.com/visitor-access/identity/
- **Preview Templates**: https://www.netlifycms.org/docs/customization/

---

## Summary Checklist

- [ ] Updated `admin/config.yml` with correct repo name
- [ ] Deployed site to Netlify
- [ ] Enabled Netlify Identity
- [ ] Enabled Git Gateway
- [ ] Sent invitation email
- [ ] Accepted invitation and set password
- [ ] Logged into CMS at `/admin/`
- [ ] Made a test edit and published
- [ ] Verified change appears on GitHub
- [ ] Verified GitHub Pages still works

**Congratulations!** Your CMS is now set up and ready to use. 🎉
