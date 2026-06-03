// Email validation regex
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone validation regex (basic)
export const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
};

export function setLoadingState(isLoading, signupButton=null) {
    if (isLoading) {
        signupButton.disabled = true;
        signupButton.classList.add('loading');
        signupButton.textContent = 'Creating Account...';
    } else {
        signupButton.disabled = false;
        signupButton.classList.remove('loading');
        signupButton.textContent = 'Sign Up';
    }
}