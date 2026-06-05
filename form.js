// --- FORM SUBMISSION CONTROL ---
// This looks for your form and handles the "Order" action
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault(); // 1. Stops the page from refreshing

    // 2. Get user data (optional - if you want to use it)
    const name = this.querySelector('input[type="text"]').value;

    // 3. Show the "Sending" state (Modern Touch)
    Swal.fire({
        title: 'Processing Order...',
        text: 'Please wait a moment',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); // Shows the spinning animation
        }
    });

    // 4. Simulate a delay (like a real server response)
    setTimeout(() => {
        // 5. Success Animation!
        Swal.fire({
            title: 'Order Placed!',
            text: `Thank you, ${name}! Your order is being prepared.`,
            icon: 'success',
            confirmButtonColor: 'black',
            showClass: {
                popup: 'animate__animated animate__backInDown'
            }
        });

        // 6. Clear the cart data
        cart = []; 
        updateCartUI(); // Resets counters to 0
        
        // 7. Reset the form and close the modal
        this.reset();
        closeReviewPopup();
        
    }, 2000); // 2 second delay for realism
});
