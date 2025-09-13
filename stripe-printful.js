// Stripe + Printful Integration for Certified Psychosis
// This handles payment processing and order fulfillment

class StripePrintfulIntegration {
    constructor() {
        // Replace with your actual keys
        this.stripePublishableKey = 'pk_test_your_stripe_publishable_key'; // Replace with your Stripe publishable key
        this.printfulApiKey = 'your_printful_api_key'; // Replace with your Printful API key
        this.printfulBaseURL = 'https://api.printful.com';
        
        this.stripe = null;
        this.cart = [];
        this.customerInfo = {};
        
        this.init();
    }

    async init() {
        try {
            // Initialize Stripe
            this.stripe = Stripe(this.stripePublishableKey);
            
            // Load products from Printful
            await this.loadPrintfulProducts();
            
            // Setup event listeners
            this.setupEventListeners();
            
            console.log('Stripe + Printful integration initialized');
        } catch (error) {
            console.error('Failed to initialize integration:', error);
        }
    }

    // Load products from Printful API
    async loadPrintfulProducts() {
        try {
            const response = await fetch(`${this.printfulBaseURL}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.printfulApiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Printful API error: ${response.status}`);
            }

            const data = await response.json();
            this.products = data.result || [];
            this.updateProductDisplay();
        } catch (error) {
            console.error('Error loading Printful products:', error);
            // Fallback to demo products
            this.loadDemoProducts();
        }
    }

    // Demo products for testing
    loadDemoProducts() {
        this.products = [
            {
                id: 1,
                name: 'Chaos Hoodie',
                price: 89.99,
                printful_id: 'demo_hoodie',
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Hoodie',
                variants: [
                    { id: 'S', name: 'Small', price: 89.99, printful_variant_id: 'hoodie_s' },
                    { id: 'M', name: 'Medium', price: 89.99, printful_variant_id: 'hoodie_m' },
                    { id: 'L', name: 'Large', price: 89.99, printful_variant_id: 'hoodie_l' },
                    { id: 'XL', name: 'X-Large', price: 89.99, printful_variant_id: 'hoodie_xl' }
                ]
            },
            {
                id: 2,
                name: 'Insanity Tee',
                price: 39.99,
                printful_id: 'demo_tee',
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=T-Shirt',
                variants: [
                    { id: 'S', name: 'Small', price: 39.99, printful_variant_id: 'tee_s' },
                    { id: 'M', name: 'Medium', price: 39.99, printful_variant_id: 'tee_m' },
                    { id: 'L', name: 'Large', price: 39.99, printful_variant_id: 'tee_l' },
                    { id: 'XL', name: 'X-Large', price: 39.99, printful_variant_id: 'tee_xl' }
                ]
            }
        ];
        this.updateProductDisplay();
    }

    // Update product display on the website
    updateProductDisplay() {
        const collectionGrid = document.querySelector('.collection-grid');
        if (!collectionGrid) return;

        collectionGrid.innerHTML = '';
        
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            collectionGrid.appendChild(productCard);
        });
    }

    // Create product card element
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <select class="size-selector" data-product-id="${product.id}">
                    <option value="">Select Size</option>
                    ${product.variants.map(variant => 
                        `<option value="${variant.id}" data-price="${variant.price}" data-variant-id="${variant.printful_variant_id}">${variant.name}</option>`
                    ).join('')}
                </select>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        return card;
    }

    // Setup event listeners
    setupEventListeners() {
        // Add to cart
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                this.addToCart(e.target.dataset.productId);
            }
        });

        // Size selection
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('size-selector')) {
                this.updatePrice(e.target);
            }
        });

        // Checkout
        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.initiateCheckout();
        });
    }

    // Add product to cart
    addToCart(productId) {
        const product = this.products.find(p => p.id == productId);
        const sizeSelector = document.querySelector(`[data-product-id="${productId}"].size-selector`);
        const selectedSize = sizeSelector.value;

        if (!selectedSize) {
            this.showNotification('Please select a size', 'error');
            return;
        }

        const selectedVariant = product.variants.find(v => v.id === selectedSize);
        
        const cartItem = {
            productId: productId,
            printfulId: product.printful_id,
            variantId: selectedVariant.printful_variant_id,
            name: product.name,
            size: selectedSize,
            price: selectedVariant.price,
            image: product.image
        };

        this.cart.push(cartItem);
        this.updateCartDisplay();
        this.showNotification(`${product.name} (${selectedSize}) added to cart!`);
    }

    // Update price when size is selected
    updatePrice(selector) {
        const priceElement = selector.closest('.product-info').querySelector('.price');
        const selectedOption = selector.selectedOptions[0];
        if (selectedOption && selectedOption.dataset.price) {
            priceElement.textContent = `$${parseFloat(selectedOption.dataset.price).toFixed(2)}`;
        }
    }

    // Update cart display
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
                    <p>Size: ${item.size}</p>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="stripePrintful.removeFromCart(${index})">&times;</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotalElement.textContent = total.toFixed(2);
        cartCount.textContent = this.cart.length;
    }

    // Remove item from cart
    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCartDisplay();
    }

    // Initiate checkout process
    async initiateCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        // Show customer info form
        this.showCustomerForm();
    }

    // Show customer information form
    showCustomerForm() {
        const formHTML = `
            <div id="checkout-modal" class="checkout-modal">
                <div class="checkout-content">
                    <h2>Checkout</h2>
                    <form id="customer-form">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="customer-email" required>
                        </div>
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" id="customer-firstname" required>
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" id="customer-lastname" required>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" id="customer-address" required>
                        </div>
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" id="customer-city" required>
                        </div>
                        <div class="form-group">
                            <label>State</label>
                            <input type="text" id="customer-state" required>
                        </div>
                        <div class="form-group">
                            <label>ZIP Code</label>
                            <input type="text" id="customer-zip" required>
                        </div>
                        <div class="form-group">
                            <label>Country</label>
                            <select id="customer-country" required>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="GB">United Kingdom</option>
                                <option value="AU">Australia</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" onclick="stripePrintful.closeCheckout()">Cancel</button>
                            <button type="submit">Continue to Payment</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', formHTML);
        
        document.getElementById('customer-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processPayment();
        });
    }

    // Close checkout modal
    closeCheckout() {
        const modal = document.getElementById('checkout-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Process payment with Stripe
    async processPayment() {
        try {
            // Collect customer info
            this.customerInfo = {
                email: document.getElementById('customer-email').value,
                firstname: document.getElementById('customer-firstname').value,
                lastname: document.getElementById('customer-lastname').value,
                address: document.getElementById('customer-address').value,
                city: document.getElementById('customer-city').value,
                state: document.getElementById('customer-state').value,
                zip: document.getElementById('customer-zip').value,
                country: document.getElementById('customer-country').value
            };

            // Create Stripe checkout session
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: this.cart,
                    customer: this.customerInfo
                })
            });

            const session = await response.json();

            // Redirect to Stripe Checkout
            const { error } = await this.stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (error) {
                console.error('Stripe error:', error);
                this.showNotification('Payment failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            this.showNotification('Payment processing failed. Please try again.', 'error');
        }
    }

    // Create order in Printful after successful payment
    async createPrintfulOrder(orderData) {
        try {
            const response = await fetch(`${this.printfulBaseURL}/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.printfulApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    external_id: orderData.orderId,
                    shipping: 'STANDARD',
                    recipient: {
                        name: `${this.customerInfo.firstname} ${this.customerInfo.lastname}`,
                        address1: this.customerInfo.address,
                        city: this.customerInfo.city,
                        state_code: this.customerInfo.state,
                        country_code: this.customerInfo.country,
                        zip: this.customerInfo.zip
                    },
                    items: this.cart.map(item => ({
                        variant_id: item.variantId,
                        quantity: 1
                    }))
                })
            });

            if (!response.ok) {
                throw new Error(`Printful API error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Printful order created:', result);
            return result;
        } catch (error) {
            console.error('Error creating Printful order:', error);
            throw error;
        }
    }

    // Show notification
    showNotification(message, type = 'success') {
        // Use existing notification system
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.stripePrintful = new StripePrintfulIntegration();
});

// Export for global access
window.StripePrintfulIntegration = StripePrintfulIntegration;
