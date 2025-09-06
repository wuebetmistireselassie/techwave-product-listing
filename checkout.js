document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const payBtn = document.getElementById('pay-btn');

    // --- NEW: Selectors for payment method toggling ---
    const cardRadio = document.getElementById('payment-method-card');
    const paypalRadio = document.getElementById('payment-method-paypal');
    const cardDetailsForm = document.getElementById('card-details-form');
    const paypalForm = document.getElementById('paypal-form');

    // --- NEW: Event listeners to toggle forms ---
    cardRadio.addEventListener('change', () => {
        if (cardRadio.checked) {
            cardDetailsForm.classList.remove('hidden');
            paypalForm.classList.add('hidden');
        }
    });

    paypalRadio.addEventListener('change', () => {
        if (paypalRadio.checked) {
            paypalForm.classList.remove('hidden');
            cardDetailsForm.classList.add('hidden');
        }
    });

    // --- Payment form submission logic ---
    paymentForm.addEventListener('submit', (e) => {
        // Prevent the form from submitting normally
        e.preventDefault();

        // Show a "processing" state
        payBtn.disabled = true;
        payBtn.textContent = 'Processing...';

        // Fake a 2-second processing delay
        setTimeout(() => {
            // --- NEW: Clear the cart from localStorage on successful payment ---
            localStorage.removeItem('cart');

            // After the delay, redirect to the success page
            window.location.href = 'success.html';
        }, 2000);
    });
});
