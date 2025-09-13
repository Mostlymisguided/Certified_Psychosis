# 🧠 Certified Psychosis - E-Commerce Website

A complete e-commerce platform for the clothing brand "Certified Psychosis" featuring a minimalist black and white design with integrated Stripe payments and Printful fulfillment.

## ✨ Features

### 🎨 Design
- **Minimalist Aesthetic**: Clean black and white design
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Modern Typography**: Bebas Neue and Orbitron fonts
- **Professional UI**: Clean, edgy, and brand-focused

### 🛒 E-Commerce
- **Shopping Cart**: Full cart functionality with size selection
- **Stripe Payments**: Secure credit card processing
- **Printful Integration**: Automatic order fulfillment
- **Product Management**: Dynamic product loading
- **Order Tracking**: Complete order lifecycle

### 🚀 Technical
- **Modern JavaScript**: ES6+ with classes and async/await
- **Express Backend**: Node.js server for API handling
- **Security**: PCI-compliant payment processing
- **Performance**: Optimized loading and rendering

## 🏗️ Architecture

```
Frontend (Client-side)
├── HTML5 Structure
├── CSS3 Styling
├── Vanilla JavaScript
└── Stripe.js Integration

Backend (Server-side)
├── Express.js Server
├── Stripe API Integration
├── Printful API Integration
└── Order Management
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Stripe account
- Printful account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/certified-psychosis-website.git
   cd certified-psychosis-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys**
   - Update `stripe-printful.js` with your Stripe publishable key
   - Update `server.js` with your Stripe secret key
   - Add your Printful API key to both files

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Update the keys in the configuration files

### Printful Setup
1. Create account at [printful.com](https://printful.com)
2. Generate API key from settings
3. Add your products and get product IDs
4. Update product configuration

### Environment Variables
Create a `.env` file for production:
```env
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
PRINTFUL_API_KEY=your_printful_api_key
```

## 📁 Project Structure

```
certified-psychosis-website/
├── index.html                 # Main HTML file
├── styles.css                 # All CSS styles
├── script.js                  # Frontend JavaScript
├── stripe-printful.js         # Stripe + Printful integration
├── server.js                  # Express backend server
├── package.json               # Dependencies and scripts
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
├── STRIPE_PRINTFUL_SETUP.md   # Detailed setup guide
└── LOGO_INSTRUCTIONS.md       # Logo integration guide
```

## 🛠️ Development

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
```

### Adding Products
1. Create products in Printful dashboard
2. Update `loadDemoProducts()` in `stripe-printful.js`
3. Add product images and variants
4. Test the integration

### Customizing Design
- **Colors**: Update CSS variables in `styles.css`
- **Fonts**: Modify font imports in `index.html`
- **Layout**: Adjust grid and flexbox properties
- **Components**: Customize cart, checkout, and product cards

## 🌐 Deployment

### Recommended Platforms
- **Vercel**: Easy deployment with automatic builds
- **Netlify**: Great for static sites with serverless functions
- **Heroku**: Full-stack deployment with database
- **DigitalOcean**: VPS with full control

### Environment Setup
1. Set environment variables in your hosting platform
2. Configure domain in Stripe settings
3. Set up webhooks for order updates
4. Test the complete flow

## 🔒 Security

### Best Practices
- Never commit API keys to version control
- Use environment variables for sensitive data
- Enable webhook signature verification
- Regularly update dependencies
- Monitor for security vulnerabilities

### Payment Security
- Stripe handles all payment data securely
- PCI compliance is maintained automatically
- Fraud protection is built-in
- 3D Secure authentication supported

## 📊 Analytics & Monitoring

### Recommended Tools
- **Google Analytics**: Track user behavior
- **Stripe Dashboard**: Monitor payments and revenue
- **Printful Dashboard**: Track order fulfillment
- **Sentry**: Error monitoring and performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Stripe Documentation](https://stripe.com/docs)
- [Printful API Docs](https://developers.printful.com)
- [Express.js Guide](https://expressjs.com)

### Issues
- Create an issue for bugs or feature requests
- Check existing issues before creating new ones
- Provide detailed information about the problem

## 🎯 Roadmap

### Planned Features
- [ ] User accounts and order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app integration

### Performance Improvements
- [ ] Image optimization
- [ ] Code splitting
- [ ] Caching strategies
- [ ] CDN integration

## 🌟 Acknowledgments

- **Stripe** for payment processing
- **Printful** for order fulfillment
- **Google Fonts** for typography
- **Font Awesome** for icons

---

**Built with ❤️ for Certified Psychosis**

*Embrace the madness. Express your truth.*
