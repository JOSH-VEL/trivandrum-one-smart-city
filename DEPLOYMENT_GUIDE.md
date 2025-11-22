# 🚀 Trivandrum One - Deployment Guide

## Production-Ready Deployment on Firebase Hosting

This guide will walk you through deploying your Trivandrum One app to Firebase Hosting.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created (from the setup process)
- Environment variables configured in Blink secrets

---

## 🔧 Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

---

## 🔐 Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

---

## 🎯 Step 3: Initialize Firebase (if not already done)

```bash
firebase init hosting
```

When prompted:
- **Select your Firebase project** (the one you created earlier)
- **Public directory**: Enter `dist`
- **Configure as single-page app**: Yes
- **Set up automatic builds with GitHub**: No (optional - you can set this up later)
- **Overwrite index.html**: No

---

## 🏗️ Step 4: Build Your App

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

---

## 🚀 Step 5: Deploy to Firebase

```bash
firebase deploy --only hosting
```

---

## ✅ Step 6: Verify Deployment

After deployment completes, you'll see:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/YOUR_PROJECT_ID/overview
Hosting URL: https://YOUR_PROJECT_ID.web.app
```

Visit the Hosting URL to see your live app!

---

## 🔄 Continuous Deployment

### Option A: GitHub Actions (Recommended)

1. Go to your Firebase project settings
2. Generate a CI token: `firebase login:ci`
3. Add the token to GitHub Secrets as `FIREBASE_TOKEN`
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: YOUR_PROJECT_ID
```

### Option B: Manual Deployment

Simply run these commands whenever you want to deploy:

```bash
npm run build
firebase deploy --only hosting
```

---

## 🌐 Custom Domain Setup

### 1. Go to Firebase Console

- Navigate to: Hosting → Add custom domain

### 2. Enter Your Domain

- Enter your domain name (e.g., `trivandrumone.com`)

### 3. Configure DNS

Add these DNS records to your domain provider:

```
Type: A
Name: @
Value: (Firebase will provide the IP addresses)

Type: A
Name: www
Value: (Firebase will provide the IP addresses)
```

### 4. SSL Certificate

Firebase automatically provisions an SSL certificate for your domain (may take up to 24 hours).

---

## 🔍 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify authentication works
- [ ] Check database connections
- [ ] Test QR code scanning functionality
- [ ] Verify geolocation features
- [ ] Test on mobile devices
- [ ] Check Google Maps integration
- [ ] Verify Firebase Storage uploads work
- [ ] Test admin dashboard access

---

## 📊 Performance Optimization

### Enable Firebase Performance Monitoring

```bash
firebase init performance
```

### Enable Firebase Analytics

Already configured in your Firebase setup!

### Lighthouse Score Targets

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

Run: `npm run build && npx serve -s dist` then run Lighthouse in Chrome DevTools.

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Fails

```bash
# Re-authenticate
firebase logout
firebase login

# Try deploying again
firebase deploy --only hosting
```

### 404 Errors After Deployment

Make sure `firebase.json` has this configuration:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🎉 Success!

Your Trivandrum One app is now live and accessible worldwide!

### Next Steps:

1. **Monitor Performance**: Check Firebase Console for analytics
2. **Set Up Alerts**: Configure Firebase Alerts for errors
3. **Regular Updates**: Keep dependencies updated
4. **User Feedback**: Collect and act on user feedback
5. **Scale**: Firebase automatically scales with your user base

---

## 📞 Support

- Firebase Documentation: https://firebase.google.com/docs
- Blink Support: support@blink.new
- Community: Join our Discord

---

**Built with ❤️ using Blink.new - The world's fastest way to build production apps**
