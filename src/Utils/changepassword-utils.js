// Password validation regex - At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validate current password (not empty)
export const validateCurrentPassword = (currentPassword) => {
    if (!currentPassword || currentPassword.trim() === '') {
        return {
            isValid: false,
            error: 'Current password is required'
        };
    }
    return {
        isValid: true,
        error: null
    };
};

// Validate new password strength
export const validateNewPassword = (newPassword) => {
    if (!newPassword || newPassword.trim() === '') {
        return {
            isValid: false,
            error: 'New password is required'
        };
    }

    if (newPassword.length < 8) {
        return {
            isValid: false,
            error: 'Password must be at least 8 characters long'
        };
    }

    if (!/[a-z]/.test(newPassword)) {
        return {
            isValid: false,
            error: 'Password must contain at least one lowercase letter'
        };
    }

    if (!/[A-Z]/.test(newPassword)) {
        return {
            isValid: false,
            error: 'Password must contain at least one uppercase letter'
        };
    }

    if (!/\d/.test(newPassword)) {
        return {
            isValid: false,
            error: 'Password must contain at least one number'
        };
    }

    if (!/[@$!%*?&]/.test(newPassword)) {
        return {
            isValid: false,
            error: 'Password must contain at least one special character (@$!%*?&)'
        };
    }

    return {
        isValid: true,
        error: null
    };
};

// Validate password confirmation
export const validateConfirmPassword = (newPassword, confirmPassword) => {
    if (!confirmPassword || confirmPassword.trim() === '') {
        return {
            isValid: false,
            error: 'Please confirm your new password'
        };
    }

    if (newPassword !== confirmPassword) {
        return {
            isValid: false,
            error: 'Passwords do not match'
        };
    }

    return {
        isValid: true,
        error: null
    };
};

// Validate that new password is different from current password
export const validatePasswordNotSame = (currentPassword, newPassword) => {
    if (currentPassword === newPassword) {
        return {
            isValid: false,
            error: 'New password must be different from current password'
        };
    }

    return {
        isValid: true,
        error: null
    };
};

// Complete validation for all fields
export const validateChangePassword = (currentPassword, newPassword, confirmPassword) => {
    const errors = {};

    // Validate current password
    const currentPwdValidation = validateCurrentPassword(currentPassword);
    if (!currentPwdValidation.isValid) {
        errors.currentPassword = currentPwdValidation.error;
    }

    // Validate new password
    const newPwdValidation = validateNewPassword(newPassword);
    if (!newPwdValidation.isValid) {
        errors.newPassword = newPwdValidation.error;
    }

    // Validate confirm password only if new password is valid
    if (newPwdValidation.isValid) {
        const confirmPwdValidation = validateConfirmPassword(newPassword, confirmPassword);
        if (!confirmPwdValidation.isValid) {
            errors.confirmPassword = confirmPwdValidation.error;
        }
    }

    // Validate passwords are different
    if (currentPwdValidation.isValid && newPwdValidation.isValid && !errors.newPassword && !errors.confirmPassword) {
        const differentValidation = validatePasswordNotSame(currentPassword, newPassword);
        if (!differentValidation.isValid) {
            errors.newPassword = differentValidation.error;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
};
