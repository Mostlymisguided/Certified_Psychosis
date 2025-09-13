// Printful API Integration for Certified Psychosis
// This is a basic integration - you'll need to add your actual API credentials

class PrintfulIntegration {
    constructor() {
        this.apiKey = 'YOUR_PRINTFUL_API_KEY'; // Replace with your actual API key
        this.storeId = 'YOUR_STORE_ID'; // Replace with your store ID
        this.baseURL = 'https://api.printful.com';
        this.products = [];
        this.cart = [];
    }

    // Initialize the integration
    async init() {
        try {
            await this.loadProducts();
            this.setupEventListeners();
            console.log('Printful integration initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Printful integration:', error);
        }
    }

    // Load products from Printful
    async loadProducts() {
        try {
            const response = await fetch(`${this.baseURL}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.products = data.result || [];
            this.updateProductDisplay();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback to static products for demo
            this.loadStaticProducts();
        }
    }

    // Fallback static products (for demo purposes)
    loadStaticProducts() {
        this.products = [
            {
                id: 1,
                name: 'Chaos Hoodie',
                price: 89.99,
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Hoodie',
                variants: [
                    { id: 'S', name: 'Small', price: 89.99 },
                    { id: 'M', name: 'Medium', price: 89.99 },
                    { id: 'L', name: 'Large', price: 89.99 },
                    { id: 'XL', name: 'X-Large', price: 89.99 }
                ]
            },
            {
                id: 2,
                name: 'Insanity Tee',
                price: 39.99,
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=T-Shirt',
                variants: [
                    { id: 'S', name: 'Small', price: 39.99 },
                    { id: 'M', name: 'Medium', price: 39.99 },
                    { id: 'L', name: 'Large', price: 39.99 },
                    { id: 'XL', name: 'X-Large', price: 39.99 }
                ]
            },
            {
                id: 3,
                name: 'Madness Pants',
                price: 79.99,
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Pants',
                variants: [
                    { id: 'S', name: 'Small', price: 79.99 },
                    { id: 'M', name: 'Medium', price: 79.99 },
                    { id: 'L', name: 'Large', price: 79.99 },
                    { id: 'XL', name: 'X-Large', price: 79.99 }
                ]
            },
            {
                id: 4,
                name: 'Psycho Jacket',
                price: 129.99,
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Jacket',
                variants: [
                    { id: 'S', name: 'Small', price: 129.99 },
                    { id: 'M', name: 'Medium', price: 129.99 },
                    { id: 'L', name: 'Large', price: 129.99 },
                    { id: 'XL', name: 'X-Large', price: 129.99 }
                ]
            }
        ];
        this.updateProductDisplay();
    }

    // Update the product display on the website
    updateProductDisplay() {
        const collectionGrid = document.querySelector('.collection-grid');
        if (!collectionGrid) return;

        collectionGrid.innerHTML = '';
        
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            collectionGrid.appendChild(productCard);
        });
    }

    // Create a product card element
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
                        `<option value="${variant.id}" data-price="${variant.price}">${variant.name}</option>`
                    ).join('')}
                </select>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        return card;
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                this.addToCart(e.target.dataset.productId);
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('size-selector')) {
                this.updatePrice(e.target);
            }
        });
    }

    // Add product to cart
    addToCart(productId) {
        const product = this.products.find(p => p.id == productId);
        const sizeSelector = document.querySelector(`[data-product-id="${productId}"].size-selector`);
        const selectedSize = sizeSelector.value;

        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const cartItem = {
            productId: productId,
            name: product.name,
            size: selectedSize,
            price: parseFloat(sizeSelector.selectedOptions[0].dataset.price),
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
        // You can implement a cart sidebar or modal here
        console.log('Cart updated:', this.cart);
    }

    // Show notification
    showNotification(message) {
        // Use your existing notification system
        if (typeof showNotification === 'function') {
            showNotification(message);
        } else {
            alert(message);
        }
    }

    // Create order in Printful
    async createOrder(orderData) {
        try {
            const response = await fetch(`${this.baseURL}/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    external_id: orderData.orderId,
                    shipping: orderData.shipping,
                    recipient: orderData.recipient,
                    items: orderData.items
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}

// Initialize Printful integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const printful = new PrintfulIntegration();
    printful.init();
});

// Export for use in other scripts
window.PrintfulIntegration = PrintfulIntegration;
