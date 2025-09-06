document.addEventListener('DOMContentLoaded', () => {
    // This is the new, crucial part:
    // 1. Get the current URL's query string (e.g., "?id=5")
    const urlParams = new URLSearchParams(window.location.search);
    // 2. Get the value of the 'id' parameter
    const productId = urlParams.get('id');

    // If there's no ID in the URL, we can't show a product
    if (!productId) {
        document.getElementById('product-title').textContent = 'Product not found!';
        return;
    }

    // --- The rest of the file is the same, but the fetch URL is now dynamic ---
    let currentProduct = {};
    const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
    const cartModal = document.getElementById('cart-modal');
    // ... (include all your modal and cart variables here)
    // ---
    
    async function fetchProductData() {
        try {
            // Use the productId from the URL to fetch the correct product
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const product = await response.json();
            
            // The rest of your code works the same as before!
            currentProduct = { id: product.id, title: product.title, price: product.price, image: product.image, description: product.description };
            document.getElementById('product-title').textContent = currentProduct.title;
            document.getElementById('product-description').textContent = currentProduct.description;
            document.getElementById('product-price').textContent = `$${currentProduct.price}`;
            document.getElementById('main-product-image').src = currentProduct.image;
        } catch (error) {
            console.error('Error fetching product data:', error);
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

    // --- 3. PERSISTENT CART: WITH UPDATED LOGIC ---
    // (This section has been updated)
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the product is already in the cart
        const existingItemIndex = cart.findIndex(item => item.id === currentProduct.id);

        if (existingItemIndex > -1) {
            // If it exists, just update the quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // If it doesn't exist, add it as a new item
            const newItem = {
                id: currentProduct.id,
                title: currentProduct.title,
                price: currentProduct.price,
                image: currentProduct.image,
                quantity: quantity
            };
            cart.push(newItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // Visual feedback for the button
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
