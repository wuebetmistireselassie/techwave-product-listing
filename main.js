document.addEventListener('DOMContentLoaded', () => {

    let currentProduct = {};

    // --- NEW: Select the cart count element ---
    const cartCountElement = document.getElementById('cart-count');

    // --- NEW: Function to update the cart count display ---
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // We'll display the total number of items in the cart array
        cartCountElement.textContent = cart.length;
    }


    // --- 1. DYNAMIC DATA: FETCHING FROM API ---
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const mainImage = document.getElementById('main-product-image');

    async function fetchProductData() {
        try {
            const response = await fetch('https://fakestoreapi.com/products/14');
            const product = await response.json();

            currentProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description
            };

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
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    addToCartBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: currentProduct.id,
            title: currentProduct.title,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        // --- NEW: Update the display every time an item is added ---
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
    
    // --- NEW: Update cart count when the page first loads ---
    updateCartCount();
});
