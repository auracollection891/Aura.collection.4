document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('policyModal');
    const openBtn = document.getElementById('openPolicyBtn');
    const submitBtn = document.getElementById('submitPolicy');
    const checkbox = document.getElementById('policyAgree');
    const errorNote = document.getElementById('errorNote');

    // Open the modal
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Handle the submit logic
    submitBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            // Success! Hide everything
            modal.style.display = 'none';
            errorNote.style.display = 'none';
            console.log("User accepted policies. Proceeding to order...");
        } else {
            // Error! Tell them to tick it
            errorNote.style.display = 'block';
        }
    });

    // Optional: Reset error message when they click the checkbox
    checkbox.addEventListener('change', () => {
        if(checkbox.checked) errorNote.style.display = 'none';
    });
});
