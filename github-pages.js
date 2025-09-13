// GitHub Pages compatible Stripe integration
// This version works without a backend server

class GitHubPagesStripe {
    constructor() {
        // Replace with your actual Stripe publishable key
        this.stripePublishableKey = 'pk_test_your_stripe_publishable_key_here';
        this.stripe = null;
        this.cart = [];
        
        this.init();
    }

    async init() {
        try {
            // Initialize Stripe
            this.stripe = Stripe(this.stripePublishableKey);
            
            // Setup event listeners
            this.setupEventListeners();
            
            console.log('GitHub Pages Stripe integration initialized');
        } catch (error) {
            console.error('Failed to initialize Stripe:', error);
        }
    }

    setupEventListeners() {
        // Add to cart
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                this.addToCart(e.target);
            }
        });

        // Checkout
        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.initiateCheckout();
        });
    }

    addToCart(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(button.dataset.price);
        const sizeSelector = productCard.querySelector('.size-selector');
        const selectedSize = sizeSelector.value;

        if (!selectedSize) {
            this.showNotification('Please select a size', 'error');
            return;
        }

        const cartItem = {
            name: `${productName} (${selectedSize})`,
            price: productPrice,
            size: selectedSize,
            image: productCard.querySelector('img').src
        };

        this.cart.push(cartItem);
        this.updateCartDisplay();
        this.showNotification(`${productName} (${selectedSize}) added to cart!`);
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const cartCount = document.querySelector('.cart-count');
        
        cartItems.innerHTML = '';
        let total = 0;
        
        this.cart.forEach((item, index) => {
            total += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="githubPagesStripe.removeFromCart(${index})">&times;</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotalElement.textContent = total.toFixed(2);
        cartCount.textContent = this.cart.length;
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCartDisplay();
    }

    async initiateCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        try {
            // Create line items for Stripe
            const lineItems = this.cart.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents
                },
                quantity: 1,
            }));

            // Create Stripe checkout session
            const { error } = await this.stripe.redirectToCheckout({
                lineItems: lineItems,
                mode: 'payment',
                successUrl: `${window.location.origin}/success.html`,
                cancelUrl: `${window.location.origin}/cancel.html`,
                shippingAddressCollection: {
                    allowedCountries: ['US', 'CA', 'GB', 'AU'],
                },
            });

            if (error) {
                console.error('Stripe error:', error);
                this.showNotification('Checkout failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            this.showNotification('Checkout failed. Please try again.', 'error');
        }
    }

    showNotification(message, type = 'success') {
        // Use existing notification system
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.githubPagesStripe = new GitHubPagesStripe();
});

// Export for global access
window.GitHubPagesStripe = GitHubPagesStripe;
