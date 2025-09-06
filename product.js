document.addEventListener('DOMContentLoaded', () => {
    // --- Stripe Setup ---
    const stripe = Stripe('pk_test_51S4RkX6P8IFPS9iHyfDjDb04RhvAh8Ch0nIR0eOy4zRRlvoGDpPP0zq0TywzuinNxLEjlU0kgqsodti0pNX7xZ9900CbqPUtb3');

    // --- Element Selectors ---
    const checkoutButton = document.getElementById('checkout-btn');
    const cartIcon = document.getElementById('cart-icon-wrapper');
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // --- Basic Modal Functions ---
    function openCartModal() {
        // We don't need to populate the cart for this test
        cartModal.classList.remove('hidden');
    }
    function closeCartModal() {
        cartModal.classList.add('hidden');
    }

    // --- Event Listeners ---
    cartIcon.addEventListener('click', openCartModal);
    closeModalBtn.addEventListener('click', closeCartModal);

    // --- THE TEST IS HERE ---
    checkoutButton.addEventListener('click', () => {
        console.log("Checkout button clicked! Attempting to redirect to Stripe...");

        // We are ignoring the real cart and using simple, hardcoded data.
        const test_line_items = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Stubborn Bug Squasher',
                    images: ['https://i.imgur.com/EHyR2nP.png'], // A generic image
                },
                unit_amount: 100, // $1.00
            },
            quantity: 1,
        }];

        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));

        stripe.redirectToCheckout({
            lineItems: test_line_items,
            mode: 'payment',
            successUrl: `${baseUrl}/success.html`,
            cancelUrl: `${baseUrl}/cancel.html`,
        }).then(function (result) {
            // This will show us any client-side errors from Stripe.
            if (result.error) {
                alert(result.error.message);
                console.error("Stripe Error:", result.error.message);
            }
        });
    });

    // We are ignoring all other functions for this test (fetch, add to cart, etc.)
    // to keep it as simple as possible.
});
