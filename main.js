document.addEventListener('DOMContentLoaded', () => {

    // This object will store the product data we fetch from the API
    let currentProduct = {};

    // --- 1. DYNAMIC DATA: FETCHING FROM API ---

    // Select the HTML elements we need to update
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const mainImage = document.getElementById('main-product-image');

    // This function fetches data and updates the page
    async function fetchProductData() {
        try {
            // Fetch a product from the Fake Store API (e.g., product with ID 14)
            const response = await fetch('https://fakestoreapi.com/products/14');
            const product = await response.json();

            // Store the fetched data in our 'currentProduct' object for later use
            currentProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description
            };

            // Update the HTML content with the data we received
            productTitle.textContent = currentProduct.title;
            productDescription.textContent = currentProduct.description;
            productPrice.textContent = `$${currentProduct.price}`;
            mainImage.src = currentProduct.image;

        } catch (error) {
            console.error('Error fetching product data:', error);
            productTitle.textContent = 'Failed to load product details.';
        }
    }

    // Call the function to run it as soon as the page loads
    fetchProductData();


    // --- 2. INTERACTIVITY: IMAGE GALLERY & QUANTITY ---

    // Image gallery logic
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const fullImageSrc = this.getAttribute('data-full');
            mainImage.src = fullImageSrc;

            thumbnails.forEach(t => t.classList.replace('border-blue-500', 'border-transparent'));
            this.classList.replace('border-transparent', 'border-blue-500');
        });
    });

    // Quantity selector logic
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
        // Step A: Get the current cart from localStorage, or create an empty array if it doesn't exist
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Step B: Create a new item object using the data from 'currentProduct'
        const newItem = {
            id: currentProduct.id,
            title: currentProduct.title,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity // Use the quantity from the selector
        };

        // Step C: Add the new item to our cart array
        cart.push(newItem);

        // Step D: Save the updated cart array back into localStorage (as a string)
        localStorage.setItem('cart', JSON.stringify(cart));

        // Provide visual feedback to the user
        addToCartBtn.textContent = 'Added! ✅';
        addToCartBtn.classList.replace('bg-blue-600', 'bg-green-500');
        addToCartBtn.disabled = true;

        // Revert the button back to its original state after 2 seconds
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.classList.replace('bg-green-500', 'bg-blue-600');
            addToCartBtn.disabled = false;
        }, 2000);
    });
});
