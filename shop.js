document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const cartCountElement = document.getElementById('cart-count');

    // --- Function to update the cart count display ---
    // We copied this from product.js
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.length;
    }

    // --- Function to fetch and display all products ---
    async function fetchAllProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            
            productGrid.innerHTML = ''; // Clear any loading text

            products.forEach(product => {
                const productLink = document.createElement('a');
                productLink.href = `product.html?id=${product.id}`;
                productLink.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col';

                productLink.innerHTML = `
                    <div class="w-full h-48 flex items-center justify-center p-4">
                         <img src="${product.image}" alt="${product.title}" class="max-w-full max-h-full object-contain">
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-base font-semibold text-gray-800 flex-grow">${product.title}</h3>
                        <p class="text-lg font-bold text-gray-900 mt-2">$${product.price}</p>
                    </div>
                `;
                
                productGrid.appendChild(productLink);
            });

        } catch (error) {
            console.error('Error fetching products:', error);
            productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    }

    // --- Run functions when the page loads ---
    fetchAllProducts();
    updateCartCount(); // <-- Call this function to set the initial cart count
});
