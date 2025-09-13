// Express server for Stripe + Printful integration
// Run with: node server.js

const express = require('express');
const stripe = require('stripe')('sk_test_your_stripe_secret_key'); // Replace with your Stripe secret key
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items, customer } = req.body;
        
        // Calculate total amount
        const totalAmount = items.reduce((sum, item) => sum + (item.price * 100), 0); // Convert to cents
        
        // Create line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${item.name} (${item.size})`,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: 1,
        }));

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel.html`,
            customer_email: customer.email,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU'],
            },
            metadata: {
                customer_info: JSON.stringify(customer),
                cart_items: JSON.stringify(items)
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Handle successful payment
app.post('/payment-success', async (req, res) => {
    try {
        const { sessionId } = req.body;
        
        // Retrieve the checkout session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.payment_status === 'paid') {
            // Create order in Printful
            await createPrintfulOrder(session);
            
            res.json({ success: true, message: 'Order created successfully' });
        } else {
            res.status(400).json({ error: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Error processing payment success:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
});

// Create order in Printful
async function createPrintfulOrder(session) {
    try {
        const printfulApiKey = 'your_printful_api_key'; // Replace with your Printful API key
        const printfulBaseURL = 'https://api.printful.com';
        
        const customerInfo = JSON.parse(session.metadata.customer_info);
        const cartItems = JSON.parse(session.metadata.cart_items);
        
        // Get shipping address from session
        const shipping = session.shipping_details;
        
        const orderData = {
            external_id: session.id,
            shipping: 'STANDARD',
            recipient: {
                name: `${shipping.name}`,
                address1: shipping.address.line1,
                address2: shipping.address.line2 || '',
                city: shipping.address.city,
                state_code: shipping.address.state,
                country_code: shipping.address.country,
                zip: shipping.address.postal_code
            },
            items: cartItems.map(item => ({
                variant_id: item.variantId,
                quantity: 1
            }))
        };

        const response = await fetch(`${printfulBaseURL}/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${printfulApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
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

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Success page
app.get('/success.html', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order Successful - Certified Psychosis</title>
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                body { 
                    font-family: 'Exo 2', sans-serif; 
                    background: #ffffff; 
                    color: #000000; 
                    text-align: center; 
                    padding: 50px; 
                }
                h1 { 
                    font-family: 'Bebas Neue', sans-serif; 
                    font-size: 3rem; 
                    margin-bottom: 20px; 
                }
                .success-icon { 
                    font-size: 4rem; 
                    color: #00ff00; 
                    margin-bottom: 20px; 
                }
                .btn { 
                    display: inline-block; 
                    padding: 15px 30px; 
                    background: #000000; 
                    color: #ffffff; 
                    text-decoration: none; 
                    margin-top: 20px; 
                    border: 2px solid #000000;
                    transition: all 0.3s ease;
                }
                .btn:hover { 
                    background: #ffffff; 
                    color: #000000; 
                }
            </style>
        </head>
        <body>
            <div class="success-icon">✓</div>
            <h1>Order Successful!</h1>
            <p>Thank you for your purchase. Your order has been received and will be processed shortly.</p>
            <p>You will receive a confirmation email with tracking information.</p>
            <a href="/" class="btn">Continue Shopping</a>
        </body>
        </html>
    `);
});

// Cancel page
app.get('/cancel.html', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order Cancelled - Certified Psychosis</title>
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                body { 
                    font-family: 'Exo 2', sans-serif; 
                    background: #ffffff; 
                    color: #000000; 
                    text-align: center; 
                    padding: 50px; 
                }
                h1 { 
                    font-family: 'Bebas Neue', sans-serif; 
                    font-size: 3rem; 
                    margin-bottom: 20px; 
                }
                .cancel-icon { 
                    font-size: 4rem; 
                    color: #ff0000; 
                    margin-bottom: 20px; 
                }
                .btn { 
                    display: inline-block; 
                    padding: 15px 30px; 
                    background: #000000; 
                    color: #ffffff; 
                    text-decoration: none; 
                    margin-top: 20px; 
                    border: 2px solid #000000;
                    transition: all 0.3s ease;
                }
                .btn:hover { 
                    background: #ffffff; 
                    color: #000000; 
                }
            </style>
        </head>
        <body>
            <div class="cancel-icon">✗</div>
            <h1>Order Cancelled</h1>
            <p>Your order was cancelled. No charges have been made.</p>
            <a href="/" class="btn">Continue Shopping</a>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to update your API keys in the server.js file');
});
