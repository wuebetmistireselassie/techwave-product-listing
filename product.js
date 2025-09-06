document.addEventListener('DOMContentLoaded', () => {
    // --- Stripe Setup ---
    const stripe = Stripe('pk_test_51S4RkX6P8IFPS9iHyfDjDb04RhvAh8Ch0nIR0eOy4zRRlvoGDpPP0zq0TywzuinNxLEjlU0kgqsodti0pNX7xZ9900CbqPUtb3');
    
    // --- URL Parameter Logic ---
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('product-title').textContent = 'Product not found!';
        return;
    }

    let currentProduct = {};

    // --- All Modal and Cart Elements ---
    const mainImage = document.getElementById('main-product-image');
    const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    // We get the checkout button later, since it's created dynamically
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // --- Modal and Cart Display Functions ---
    function openCartModal() {
        populateCartModal();
        cartModal.classList.remove('hidden');
    }

    function closeCartModal() {
        cartModal.classList.add('hidden');
    }

    function populateCartModal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex justify-between items-center border-b pb-2 text-sm';
                itemElement.innerHTML = `
                    <img src="${item.image}" class="w-12 h-12 object-contain mr-2">
                    <span class="font-semibold flex-grow">${item.title.substring(0, 25)}...</span>
                    <span class="mx-2">${item.quantity} x $${item.price}</span>
                    <button class="remove-item-btn text-red-500 hover:text-red-700 font-bold" data-index="${index}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });
        
        // --- FIX: Attach checkout listener AFTER the button is created ---
        const checkoutButton = document.getElementById('checkout-btn');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', handleCheckout);
        }
    }

    // --- NEW: Moved checkout logic to its own function ---
    function handleCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const line_items = cart.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        images: [item.image],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });
        
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));

        stripe.redirectToCheckout({
            lineItems: line_items,
            mode: 'payment',
            successUrl: `${baseUrl}/success.html`,
            cancelUrl: `${baseUrl}/cancel.html`,
        });
    }

    function handleRemoveItem(event) {
        const itemIndex = parseInt(event.target.getAttribute('data-index'));
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        populateCartModal();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.length;
    }
    
    // --- Event Listeners ---
    cartIcon.addEventListener('click', openCartModal);
    closeModalBtn.addEventListener('click', closeCartModal);

    // --- DYNAMIC DATA: FETCHING FROM API ---
    async function fetchProductData() {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const product = await response.json();
            currentProduct = { id: product.id, title: product.title, price: product.price, image: product.image, description: product.description };
            document.getElementById('product-title').textContent = currentProduct.title;
            document.getElementById('product-description').textContent = currentProduct.description;
            document.getElementById('product-price').textContent = `$${currentProduct.price}`;
            mainImage.src = currentProduct.image;
        } catch (error) {
            console.error('Error fetching product data:', error);
            document.getElementById('product-title').textContent = 'Failed to load product details.';
        }
    }
    
    // --- INTERACTIVITY: IMAGE GALLERY & QUANTITY ---
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const fullImageSrc = this.getAttribute('data-full');
            mainImage.src = fullImageSrc;
            thumbnails.forEach(t => t.classList.replace('border-blue-500', 'border-transparent'));
            this.classList.replace('border-transparent', 'border-blue-500');
        });
    });

    const plusBtn = document.getElementById('btn-plus');
    const minusBtn = document.getElementById('btn-minus');
    const quantityDisplay = document.getElementById('quantity-display');
    let quantity = 1;

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    // --- PERSISTENT CART: WITH UPDATED LOGIC ---
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === currentProduct.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            const newItem = { id: currentProduct.id, title: currentProduct.title, price: currentProduct.price, image: currentProduct.image, quantity: quantity };
            cart.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        addToCartBtn.textContent = 'Added! ✅';
        addToCartBtn.classList.replace('bg-blue-600', 'bg-green-500');
        addToCartBtn.disabled = true;
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.classList.replace('bg-green-500', 'bg-blue-600');
            addToCartBtn.disabled = false;
        }, 2000);
    });
    
    // --- Initialize Page ---
    fetchProductData();
    updateCartCount();
});
