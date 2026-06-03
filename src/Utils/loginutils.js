// Email validation regex
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation - minimum 8 characters
export const validatePassword = (password) => {
    return password.length >= 8;
};

export function setLoadingState(isLoading,loginButton=null,emailInput=null,passwordInput=null) {

    if (isLoading) {
        loginButton.disabled = true;
        loginButton.classList.add('loading');
        loginButton.textContent = 'Login In...';
        emailInput.disabled = true;
        passwordInput.disabled = true;
    } else {
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
        loginButton.textContent = 'Sign In';
        emailInput.disabled = false;
        passwordInput.disabled = false;
    }
}