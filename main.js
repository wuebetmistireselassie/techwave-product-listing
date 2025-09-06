document.addEventListener('DOMContentLoaded', () => {

    let currentProduct = {};

    // --- NEW: Select all modal and cart elements ---
    const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // --- NEW: Function to open/show the modal ---
    function openCartModal() {
        populateCartModal(); // First, fill it with the latest cart items
        cartModal.classList.remove('hidden'); // Then, show it
    }

    // --- NEW: Function to close the modal ---
    function closeCartModal() {
        cartModal.classList.add('hidden');
    }

    // --- NEW: Function to populate the modal with items from localStorage ---
    function populateCartModal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; // Clear old items first
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex justify-between items-center border-b pb-2 text-sm';
                itemElement.innerHTML = `
                    <img src="${item.image}" class="w-12 h-12 object-contain mr-2">
                    <span class="font-semibold flex-grow">${item.title.substring(0, 25)}...</span>
                    <span class="mx-2">${item.quantity} x $${item.price}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }


    // --- Function to update the cart count bubble ---
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.length;
    }
    
    // --- NEW: Add event listeners for the modal ---
    cartIcon.addEventListener('click', openCartModal);
    closeModalBtn.addEventListener('click', closeCartModal);

    // --- 1. DYNAMIC DATA: FETCHING FROM API ---
    // (This section remains unchanged)
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const mainImage = document.getElementById('main-product-image');

    async function fetchProductData() {
        try {
            const response = await fetch('https://fakestoreapi.com/products/14');
            const product = await response.json();
            currentProduct = { id: product.id, title: product.title, price: product.price, image: product.image, description: product.description };
            productTitle.textContent = currentProduct.title;
            productDescription.textContent = currentProduct.description;
            productPrice.textContent = `$${currentProduct.price}`;
            mainImage.src = currentProduct.image;
        } catch (error) {
            console.error('Error fetching product data:', error);
            productTitle.textContent = 'Failed to load product details.';
        }
    }
    fetchProductData();

    // --- 2. INTERACTIVITY: IMAGE GALLERY & QUANTITY ---
    // (This section remains unchanged)
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

    // --- 3. PERSISTENT CART: USING LOCALSTORAGE ---
    // (This section remains unchanged)
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = { id: currentProduct.id, title: currentProduct.title, price: currentProduct.price, image: currentProduct.image, quantity: quantity };
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount(); // Update the count bubble

        addToCartBtn.textContent = 'Added! ✅';
        addToCartBtn.classList.replace('bg-blue-600', 'bg-green-500');
        addToCartBtn.disabled = true;
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.classList.replace('bg-green-500', 'bg-blue-600');
            addToCartBtn.disabled = false;
        }, 2000);
    });
    
    // --- Initialize cart count on page load ---
    updateCartCount();
});
