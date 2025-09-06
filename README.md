TechWave E-commerce Frontend
TechWave is a dynamic and responsive front-end for an e-commerce website, built with vanilla JavaScript, HTML, and Tailwind CSS. It demonstrates a complete user shopping experience, from browsing products fetched from a live API to managing a persistent shopping cart and completing a mock checkout process.

View the Live Project Here
(A screenshot of the live TechWave project's product listing page)

✨ Features
Product Browsing: Fetches and displays a grid of products from the free FakeStoreAPI.

Product Details Page: Click on any product to view a dedicated page with more details.

Interactive Shopping Cart: Add or remove items from the cart, which updates dynamically.

Persistent State: The contents of the shopping cart are saved in the browser's localStorage, so the user's selections are not lost on refresh or exit.

Responsive Design: A clean, mobile-first design that adapts seamlessly to all screen sizes, from mobile phones to desktops.

Mock Checkout Flow: A complete multi-step checkout process that simulates a real-world purchasing experience.

Order Confirmation: Success and cancellation pages to provide feedback to the user after checkout.

🛠️ Technologies Used
HTML5: For semantic and accessible markup.

CSS3 & Tailwind CSS: For a modern, utility-first approach to styling and responsive design.

JavaScript (ES6+): For all client-side logic, including API calls, DOM manipulation, and state management.

FakeStoreAPI: Used as the REST API for fetching product data.

localStorage API: To enable cart persistence across browser sessions.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You just need a modern web browser and a code editor (like VS Code).

Installation
Clone the repository:

git clone [https://github.com/wuebetmistireselassie/techwave-product-listing.git](https://github.com/wuebetmistireselassie/techwave-product-listing.git)

Navigate to the project directory:

cd techwave-product-listing

Open index.html in your browser.
For the best experience and to avoid any potential CORS issues with API calls, it's recommended to use a live server. If you are using VS Code, you can use the Live Server extension.

📂 Project Structure
The project is organized with a clear separation of concerns:

/
├── index.html          # Main product listing/shop page
├── product.html        # Template for the single product details page
├── checkout.html       # The checkout form page
├── success.html        # Displayed after a successful mock transaction
├── cancel.html         # Displayed if the user cancels the process
│
├── shop.js             # Handles logic for the main shop (fetching products, cart)
├── product.js          # Handles logic for the single product page
└── checkout.js         # Handles the form validation and logic for checkout

🙏 Acknowledgements
This project relies on the fantastic and free FakeStoreAPI for providing realistic product data.

📄 License
This project is licensed under the MIT License.
