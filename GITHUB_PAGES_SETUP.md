# GitHub Pages Setup Guide

## 🚀 **Deploy Your Website to GitHub Pages**

This guide will help you deploy your Certified Psychosis website to GitHub Pages for free hosting.

## 📋 **Setup Steps**

### 1. Prepare for GitHub Pages

GitHub Pages only hosts static files, so we've created a special version that works without a backend server.

**Files for GitHub Pages:**
- `index-github-pages.html` → Rename to `index.html`
- `github-pages.js` → Stripe integration without backend
- `success.html` → Order success page
- `cancel.html` → Order cancelled page
- `styles.css` → All styling (same as before)

### 2. Switch to GitHub Pages Version

```bash
# Backup the original index.html
mv index.html index-full-stack.html

# Use the GitHub Pages version
mv index-github-pages.html index.html
```

### 3. Configure Stripe

1. **Get your Stripe publishable key** from [stripe.com](https://stripe.com)
2. **Update `github-pages.js`**:
   ```javascript
   this.stripePublishableKey = 'pk_test_your_actual_stripe_key_here';
   ```

### 4. Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section
4. **Under "Source"** select "Deploy from a branch"
5. **Select "main"** branch and "/ (root)" folder
6. **Click "Save"**

### 5. Your Website is Live!

Your website will be available at:
`https://mostlymisguided.github.io/Certified_Psychosis/`

## ⚠️ **Important Limitations**

### What Works:
- ✅ **Website Display** - Full responsive design
- ✅ **Shopping Cart** - Add/remove items
- ✅ **Stripe Payments** - Secure checkout
- ✅ **Contact Forms** - Basic functionality

### What Doesn't Work:
- ❌ **Printful Integration** - Requires backend server
- ❌ **Order Fulfillment** - No automatic printing
- ❌ **Email Notifications** - No server to send emails
- ❌ **Order Management** - No database

## 🔧 **Workarounds for Missing Features**

### 1. Manual Order Processing
- **Stripe Dashboard** - View successful payments
- **Manual Fulfillment** - Process orders manually
- **Email Customers** - Send tracking info manually

### 2. Alternative Solutions

#### Option A: Use Stripe + Manual Process
1. Customer pays via Stripe
2. You receive email notification
3. Process order manually in Printful
4. Email customer with tracking

#### Option B: Upgrade to Full Stack
- Deploy to **Vercel** or **Netlify** with serverless functions
- Keep GitHub Pages for frontend
- Add backend for full automation

## 🛠️ **Customization**

### Update Product Information
Edit the product cards in `index.html`:
```html
<div class="product-card">
    <div class="product-image">
        <img src="your-image-url" alt="Product Name">
    </div>
    <div class="product-info">
        <h3>Your Product Name</h3>
        <p class="price">$XX.99</p>
        <!-- ... rest of product card ... -->
    </div>
</div>
```

### Add Your Logo
1. **Replace `logo.png`** with your actual logo
2. **Update alt text** in HTML
3. **Commit and push** changes

### Customize Styling
- **Colors**: Edit CSS variables in `styles.css`
- **Fonts**: Update Google Fonts imports
- **Layout**: Modify grid and flexbox properties

## 📱 **Testing Your Site**

### Local Testing
```bash
# Serve the site locally
python3 -m http.server 8000
# Or
npx serve .
```

### Production Testing
1. **Test on mobile** devices
2. **Check all links** work correctly
3. **Test Stripe checkout** with test cards
4. **Verify responsive** design

## 🚀 **Deployment Process**

### Automatic Deployment
- **Push to main branch** → GitHub Pages updates automatically
- **Changes go live** within 5-10 minutes
- **No manual deployment** needed

### Manual Updates
```bash
# Make changes to your files
git add .
git commit -m "Update website"
git push origin main
```

## 🔒 **Security Notes**

### API Keys
- **Never commit** real API keys to GitHub
- **Use test keys** for development
- **Switch to live keys** only when ready

### Stripe Configuration
- **Test mode** for development
- **Live mode** for production
- **Webhook setup** for order notifications

## 📊 **Analytics Setup**

### Google Analytics
Add to your `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 **Troubleshooting**

### Common Issues
1. **Site not loading** - Check GitHub Pages settings
2. **Stripe not working** - Verify API key is correct
3. **Images not showing** - Check file paths and names
4. **Styling broken** - Verify CSS file is linked correctly

### Getting Help
- **GitHub Pages Docs** - [docs.github.com/pages](https://docs.github.com/pages)
- **Stripe Docs** - [stripe.com/docs](https://stripe.com/docs)
- **Check browser console** for JavaScript errors

## 🎯 **Next Steps**

1. **Set up GitHub Pages** following this guide
2. **Configure Stripe** with your API keys
3. **Test everything** thoroughly
4. **Add your products** and logo
5. **Go live!** 🚀

Your Certified Psychosis website will be live on GitHub Pages with Stripe payments working perfectly!
