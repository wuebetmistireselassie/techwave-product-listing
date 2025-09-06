document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const payBtn = document.getElementById('pay-btn');

    paymentForm.addEventListener('submit', (e) => {
        // Prevent the form from submitting normally
        e.preventDefault();

        // Show a "processing" state
        payBtn.disabled = true;
        payBtn.textContent = 'Processing...';

        // Fake a 2-second processing delay
        setTimeout(() => {
            // After the delay, redirect to the success page
            window.location.href = 'success.html';
        }, 2000);
    });
});
