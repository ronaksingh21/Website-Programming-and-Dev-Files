function validateForm() {
    // Get all form controls
    const formControls = document.querySelectorAll(".form-control input, .form-control textarea, .form-control select");

    // Check if all form controls are filled
    for (const control of formControls) {
        if (!control.value.trim()) {
            return false; // Return false if any control is not filled
        }
    }
    return true; // Return true if all controls are filled
}
