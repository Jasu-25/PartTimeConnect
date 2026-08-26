import { useContext, useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader';
import './ProviderSettings.css';
import { validateChangePassword } from '../../Utils/changepassword-utils';
import axios from 'axios';
import { Providerddata } from '../../main';
import { getInitials } from '../../Utils/seekerutils';
import { useNavigate } from 'react-router';
export function ProviderSettings() {

    const [isOpenAccount, setIsOpenAccount] = useState(false)
    const [isOpenSecurity, setIsOpenSecurity] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isDeleteAccount, setIsDeleteAccount] = useState(false)
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isAccountDeleted , setIsAccountDeleted] = useState(false)
    const { providerData: Providerdata, refreshProvider: refreshProvider } = useContext(Providerddata);
    const loginNavigate = useNavigate();

    // Handle input change
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (passwordErrors[name]) {
            setPasswordErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const validation = validateChangePassword(
            passwordForm.currentPassword,
            passwordForm.newPassword,
            passwordForm.confirmPassword
        );

        if (!validation.isValid) {
            setPasswordErrors(validation.errors);
            return;
        }

        try {
            const response = await axios.post('/PartTimeConnect-Backend/change_pass_provider.php', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                'currentPassword': passwordForm?.currentPassword,
                'newPassword': passwordForm?.newPassword
            });
            if (response.data?.status === "error") {
                setPasswordErrors(prev => ({
                    ...prev,
                    currentPassword: response.data?.message
                }));
            }
            if (response.data?.status === 'success') {
                setSuccessMessage('Password changed successfully!');
                // Reset form
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setPasswordErrors({});

                // Close modal after 2 seconds
                setTimeout(() => {
                    setIsChangePassword(false);
                    setSuccessMessage('');
                }, 2000);
            }
        } catch (e) {
            console.log(e);
        }



    };

    // Handle modal close
    const handleClosePasswordModal = () => {
        setIsChangePassword(false);
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordErrors({});
        setSuccessMessage('');
    };

    const deleteProviderAccount = async () => {
        try {
            const response = await axios.post('/PartTimeConnect-Backend/delete_account_provider.php', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data?.status === 'success') {
                 setIsAccountDeleted(true);
                 setTimeout(()=>{
                    setIsAccountDeleted(false);
                    loginNavigate('/jobproviderlogin')
                 },3000)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!Providerdata) {
            refreshProvider();
        }
    }, [])

    return (
        <>
            <ProviderHeader />
            <main className="ps-settings-container">
                <section className="ps-company-header">
                    <div className="ps-company-logo-container">
                        <h3 className="ps-company-logo">{getInitials(Providerdata?.company_name ? Providerdata?.company_name : '!')}</h3>
                    </div>
                    <div className="ps-company-info">
                        <h1 className="ps-company-name">{Providerdata?.company_name ? Providerdata?.company_name : 'NA'}</h1>
                        <div className="ps-company-details">
                            {Providerdata?.company_description ? Providerdata?.company_description : 'NA'}
                        </div>
                    </div>
                </section>

                <div className="ps-settings-card">
                    <h2>Profile Settings</h2>

                    <div className="ps-setting-section">
                        <div className={`ps-section-header ${isOpenSecurity ? 'expanded' : ''}`} id="securitySettingsHeader">
                            <h3>Security Settings</h3>
                            <i className="fas fa-chevron-down ps-dropdown-icon" onClick={() => (setIsOpenSecurity(!isOpenSecurity))}></i>
                        </div>
                        <div className="ps-dropdown-content" id="securitySettingsDropdown">
                            <div className="ps-dropdown-item-setting">
                                <span>Change Password</span>
                                <button className="ps-manage-btn" data-modal-target="changePasswordModal" onClick={() => (setIsChangePassword(true))}>Manage</button>
                            </div>
                        </div>
                    </div>

                    <div className="ps-setting-section">
                        <div className={`ps-section-header ${isOpenAccount ? 'expanded' : ''}`} id="accountManagementHeader">
                            <h3>Account Management</h3>
                            <i className="fas fa-chevron-down ps-dropdown-icon" onClick={() => (setIsOpenAccount(!isOpenAccount))}></i>
                        </div>
                        <div className="ps-dropdown-content" id="accountManagementDropdown">

                            <div className="ps-dropdown-item-setting ">
                                <span>Delete Account</span>
                                <button className="ps-manage-btn" data-modal-target="deleteAccountModal" onClick={() => (setIsDeleteAccount(true))}>Manage</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div id="changePasswordModal" className={`ps-modal-overlay ${isChangePassword ? 'show' : ''}`}>
                <div className="ps-modal-content">
                    <span className="ps-close-button" onClick={handleClosePasswordModal}>&times;</span>
                    <h3>Change Password</h3>
                    {successMessage && <div className="ps-success-message">{successMessage}</div>}
                    <form onSubmit={handleChangePasswordSubmit}>
                        <div className="ps-form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordInputChange}
                                className={passwordErrors.currentPassword ? 'error' : ''}
                                required
                            />
                            {passwordErrors.currentPassword && (
                                <span className="ps-error-message">{passwordErrors.currentPassword}</span>
                            )}
                        </div>
                        <div className="ps-form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordInputChange}
                                className={passwordErrors.newPassword ? 'error' : ''}
                                required
                            />
                            {passwordErrors.newPassword && (
                                <span className="ps-error-message">{passwordErrors.newPassword}</span>
                            )}
                            <small className="ps-password-hint">
                                Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)
                            </small>
                        </div>
                        <div className="ps-form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordInputChange}
                                className={passwordErrors.confirmPassword ? 'error' : ''}
                                required
                            />
                            {passwordErrors.confirmPassword && (
                                <span className="ps-error-message">{passwordErrors.confirmPassword}</span>
                            )}
                        </div>
                        <button type="submit" name="submit" className="ps-modal-save-btn">Save Changes</button>
                    </form>
                </div>
            </div>

            <div id="deleteAccountModal" className={`ps-modal-overlay ${isDeleteAccount ? 'show' : ''}`}>
                <div className="ps-modal-content">
                    <span className="ps-close-button" onClick={() => (setIsDeleteAccount(false))}>&times;</span>
                    <h3>Delete Account</h3>
                    <p>Are you absolutely sure you want to delete your account? This action is irreversible.</p>
                    <button className="ps-modal-delete-btn" onClick={deleteProviderAccount}>Delete Account</button>
                </div>
            </div>

            <div class={`Accountdeleted-overlay ${isAccountDeleted?'show':''}`} id="Accountdeleted-modal" role="dialog" aria-modal="true" aria-labelledby="Accountdeleted-title-id">
                <div class="Accountdeleted-box">
                    <div class="Accountdeleted-icon-wrapper">
                        <i class="fas fa-check Accountdeleted-icon"></i>
                    </div>

                    <h3 class="Accountdeleted-title" id="Accountdeleted-title-id">Successfully Deleted Account</h3>

                    <div class="Accountdeleted-redirect-group">
                        <p class="Accountdeleted-subtitle">Navigating to login page...</p>

                        <div class="Accountdeleted-loader-ring" aria-label="Loading"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
