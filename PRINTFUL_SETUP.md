# Printful Integration Setup Guide

## 🚀 **Quick Start (Recommended)**

### Option 1: Printful + Shopify (Easiest)
1. **Create Shopify Store**: Set up a basic Shopify store
2. **Connect Printful**: Install Printful app in Shopify
3. **Sync Products**: Your Printful products automatically sync to Shopify
4. **Embed Shopify**: Use Shopify's Buy Button or embed code in your website

### Option 2: Printful API (Advanced)
1. **Get API Key**: Sign up at printful.com and get your API key
2. **Update Configuration**: Replace placeholders in `printful-integration.js`
3. **Test Integration**: Verify products load correctly

## 📋 **Step-by-Step Setup**

### 1. Printful Account Setup
1. Go to [printful.com](https://printful.com)
2. Create an account
3. Go to Settings → API → Generate API Key
4. Copy your API key

### 2. Update Configuration
Edit `printful-integration.js` and replace:
```javascript
this.apiKey = 'YOUR_PRINTFUL_API_KEY'; // Replace with your actual API key
this.storeId = 'YOUR_STORE_ID'; // Replace with your store ID
```

### 3. Product Setup
1. In Printful dashboard, create your products
2. Upload your designs
3. Set up variants (sizes, colors)
4. Publish products

### 4. Test Integration
1. Open your website
2. Check if products load in the collection section
3. Test adding items to cart
4. Verify cart functionality works

## 🛠 **Advanced Features**

### Order Management
- Orders automatically sync to Printful
- Real-time inventory tracking
- Automatic fulfillment

### Customization
- Modify product display in `updateProductDisplay()`
- Customize cart behavior in `script.js`
- Add payment processing (Stripe, PayPal)

### Webhooks
Set up webhooks for:
- Order status updates
- Inventory changes
- Fulfillment notifications

## 💳 **Payment Integration**

### Recommended Payment Processors
1. **Stripe**: Most popular, easy integration
2. **PayPal**: Good for international customers
3. **Square**: Good for small businesses

### Implementation
```javascript
// Example Stripe integration
const stripe = Stripe('your_stripe_publishable_key');
const {error} = await stripe.redirectToCheckout({
    lineItems: cartItems,
    mode: 'payment',
    successUrl: 'https://yoursite.com/success',
    cancelUrl: 'https://yoursite.com/cancel'
});
```

## 🔧 **Troubleshooting**

### Common Issues
1. **Products not loading**: Check API key and network connection
2. **Cart not working**: Verify JavaScript console for errors
3. **Checkout failing**: Ensure payment processor is configured

### Debug Mode
Add this to `printful-integration.js` for debugging:
```javascript
console.log('Products loaded:', this.products);
console.log('Cart contents:', this.cart);
```

## 📞 **Support**

- **Printful Support**: [help.printful.com](https://help.printful.com)
- **API Documentation**: [developers.printful.com](https://developers.printful.com)
- **Community**: Printful Facebook group

## 🎯 **Next Steps**

1. **Set up Printful account**
2. **Configure API integration**
3. **Test with sample products**
4. **Add payment processing**
5. **Go live!**

Your website is now ready for e-commerce with Printful integration!
