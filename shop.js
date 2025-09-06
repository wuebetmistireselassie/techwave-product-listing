document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');

    async function fetchAllProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            
            products.forEach(product => {
                // Create a container (a link) for each product card
                const productLink = document.createElement('a');
                // The link will go to product.html and pass the product's ID in the URL
                productLink.href = `product.html?id=${product.id}`;
                productLink.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow';

                // Set the inner HTML of the link to be the product card
                productLink.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain p-4">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 truncate">${product.title}</h3>
                        <p class="text-xl font-bold text-gray-900 mt-2">$${product.price}</p>
                    </div>
                `;
                
                // Add the new product card to the grid
                productGrid.appendChild(productLink);
            });

        } catch (error) {
            console.error('Error fetching products:', error);
            productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    }

    fetchAllProducts();
});
