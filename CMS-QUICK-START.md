# CMS Quick Start Guide

## 5-Minute Setup

### 1. Update Config (1 minute)
Edit `admin/config.yml` line 3:
```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
```
Example: `repo: deborahlyon/deborah-lyon-website`

### 2. Deploy to Netlify (2 minutes)
1. Go to https://app.netlify.com
2. "Add new site" → "Import existing project" → "GitHub"
3. Select your repo
4. Leave build settings blank
5. Click "Deploy"

### 3. Enable CMS Login (2 minutes)
In Netlify dashboard:
1. "Site settings" → "Identity" → "Enable Identity"
2. "Registration" → "Invite only" → Save
3. "Services" → "Enable Git Gateway"
4. "Identity" tab → "Invite users" → Enter email
5. Check email and set password

### 4. Start Editing!
Go to: `https://YOUR-SITE.netlify.app/admin/`

---

## What You Can Edit

- **Hero Section**: Main heading and subheading
- **About Section**: Bio paragraphs
- **Opening Hours**: Days and times
- **Gallery**: Upload and manage photos

---

## Making Changes

1. Log in at `/admin/`
2. Click the section to edit
3. Make your changes
4. Click "Publish"
5. Wait 2 minutes for changes to appear

---

## Your URLs

- **CMS Editor**: `https://YOUR-SITE.netlify.app/admin/`
- **Netlify Site**: `https://YOUR-SITE.netlify.app/`
- **GitHub Pages** (unchanged): `https://username.github.io/repo/`

Both sites show the same content. Edit once, updates everywhere!

---

## Need Help?

See full guide: [NETLIFY-CMS-SETUP.md](NETLIFY-CMS-SETUP.md)
