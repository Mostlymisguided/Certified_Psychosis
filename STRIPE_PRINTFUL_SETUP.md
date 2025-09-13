# Stripe + Printful Integration Setup Guide

## 🚀 **Complete E-Commerce Solution**

Your website now has a full e-commerce system with:
- **Stripe Payment Processing** - Secure credit card payments
- **Printful Order Fulfillment** - Automatic printing and shipping
- **Shopping Cart** - Full cart functionality
- **Customer Management** - Order tracking and customer info

## 📋 **Setup Steps**

### 1. Get Your API Keys

#### Stripe Setup
1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to Developers → API Keys
3. Copy your **Publishable Key** (starts with `pk_test_`)
4. Copy your **Secret Key** (starts with `sk_test_`)

#### Printful Setup
1. Go to [printful.com](https://printful.com) and create an account
2. Go to Settings → API → Generate API Key
3. Copy your **API Key**

### 2. Update Configuration Files

#### Update `stripe-printful.js`
```javascript
// Replace these lines in stripe-printful.js
this.stripePublishableKey = 'pk_test_your_actual_stripe_key_here';
this.printfulApiKey = 'your_actual_printful_key_here';
```

#### Update `server.js`
```javascript
// Replace these lines in server.js
const stripe = require('stripe')('sk_test_your_actual_stripe_secret_key');
const printfulApiKey = 'your_actual_printful_key_here';
```

### 3. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Or install individually
npm install express stripe cors
npm install -D nodemon
```

### 4. Set Up Printful Products

1. **Log into Printful Dashboard**
2. **Go to Products → Add Product**
3. **Upload your designs** for each product
4. **Set up variants** (sizes, colors)
5. **Note the Product IDs** for each item

### 5. Update Product IDs

In `stripe-printful.js`, update the `loadDemoProducts()` function with your actual Printful product IDs:

```javascript
loadDemoProducts() {
    this.products = [
        {
            id: 1,
            name: 'Chaos Hoodie',
            price: 89.99,
            printful_id: 'your_actual_printful_product_id', // Replace this
            variants: [
                { 
                    id: 'S', 
                    name: 'Small', 
                    price: 89.99, 
                    printful_variant_id: 'your_actual_variant_id' // Replace this
                },
                // ... more variants
            ]
        }
        // ... more products
    ];
}
```

### 6. Run the Server

```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

Your website will be available at `http://localhost:3000`

## 🛠 **How It Works**

### Customer Journey
1. **Browse Products** - Customers see your Printful products
2. **Add to Cart** - Select sizes and add items
3. **Checkout** - Fill in customer information
4. **Payment** - Secure Stripe payment processing
5. **Order Fulfillment** - Automatic Printful order creation
6. **Shipping** - Printful handles printing and shipping

### Technical Flow
1. **Frontend** - React to user actions, manage cart
2. **Stripe** - Process payments securely
3. **Backend** - Handle order creation and API calls
4. **Printful** - Receive order and fulfill automatically

## 💳 **Payment Processing**

### Stripe Features
- **Secure Payments** - PCI compliant
- **Multiple Payment Methods** - Cards, Apple Pay, Google Pay
- **International Support** - Global payment processing
- **Fraud Protection** - Built-in security features

### Pricing
- **Stripe**: 2.9% + 30¢ per transaction
- **Printful**: Product cost + shipping
- **No Monthly Fees** - Pay only when you sell

## 📦 **Order Fulfillment**

### Printful Features
- **Automatic Fulfillment** - Orders print automatically
- **Quality Control** - Professional printing standards
- **Global Shipping** - Worldwide delivery
- **Tracking** - Automatic tracking numbers

### Product Types
- **Apparel** - T-shirts, hoodies, jackets
- **Accessories** - Hats, bags, phone cases
- **Home Goods** - Posters, mugs, pillows

## 🔧 **Customization**

### Add New Products
1. Create product in Printful
2. Add to `loadDemoProducts()` function
3. Update product images and pricing

### Modify Checkout
- Edit `showCustomerForm()` for different fields
- Customize success/cancel pages
- Add order confirmation emails

### Styling
- All styles in `styles.css`
- Checkout modal styles included
- Responsive design for mobile

## 🚨 **Important Notes**

### Security
- **Never commit API keys** to version control
- **Use environment variables** for production
- **Enable webhook verification** for production

### Testing
- **Use Stripe test mode** for development
- **Test with test card numbers**
- **Verify Printful orders** in dashboard

### Production Deployment
1. **Get live API keys** from Stripe and Printful
2. **Set up webhooks** for order updates
3. **Configure domain** in Stripe settings
4. **Deploy to hosting** (Heroku, Vercel, etc.)

## 📞 **Support**

### Stripe Support
- [support.stripe.com](https://support.stripe.com)
- Excellent documentation and support

### Printful Support
- [help.printful.com](https://help.printful.com)
- Live chat and email support

### Your Website
- All code is well-commented
- Easy to modify and extend
- Built with modern web standards

## 🎯 **Next Steps**

1. **Set up accounts** and get API keys
2. **Install dependencies** and run server
3. **Test with sample products**
4. **Add your actual products**
5. **Go live!**

Your e-commerce website is now ready to sell Certified Psychosis clothing worldwide! 🌟
