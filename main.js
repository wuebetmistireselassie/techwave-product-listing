document.addEventListener('DOMContentLoaded', () => {

    // --- 1. IMAGE GALLERY ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Get the full-size image URL from the 'data-full' attribute
            const fullImage = this.getAttribute('data-full');
            mainImage.src = fullImage;

            // Update active thumbnail border
            thumbnails.forEach(t => t.classList.remove('border-blue-500'));
            this.classList.add('border-blue-500');
        });
    });

    // --- 2. QUANTITY SELECTOR ---
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

    // --- 3. ADD TO CART BUTTON FEEDBACK ---
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    addToCartBtn.addEventListener('click', () => {
        // Change button text and style
        addToCartBtn.textContent = 'Added! ✅';
        addToCartBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        addToCartBtn.classList.add('bg-green-500');

        // Revert back after a few seconds
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.classList.remove('bg-green-500');
            addToCartBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000); // Reverts after 2 seconds
    });

});
