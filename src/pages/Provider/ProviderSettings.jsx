import { ProviderHeader } from './ProviderHeader';
import './ProviderSettings.css';
export function ProviderSettings() {
    return (
        <>
            <ProviderHeader/>
            <main className="ps-settings-container">
                <section className="ps-company-header">
                    <div className="ps-company-logo-container">
                        <h3 className="ps-company-logo"></h3>
                    </div>
                    <div className="ps-company-info">
                        <h1 className="ps-company-name">TechStart Solutions</h1>
                        <div className="ps-company-details">

                        </div>
                    </div>
                </section>

                <div className="ps-settings-card">
                    <h2>Profile Settings</h2>

                    <div className="ps-setting-section">
                        <div className="ps-section-header" id="securitySettingsHeader">
                            <h3>Security Settings</h3>
                            <i className="fas fa-chevron-down ps-dropdown-icon"></i>
                        </div>
                        <div className="ps-dropdown-content" id="securitySettingsDropdown">
                            <div className="ps-dropdown-item-setting">
                                <span>Change Password</span>
                                <button className="ps-manage-btn" data-modal-target="changePasswordModal">Manage</button>
                            </div>
                        </div>
                    </div>

                    <div className="ps-setting-section">
                        <div className="ps-section-header" id="accountManagementHeader">
                            <h3>Account Management</h3>
                            <i className="fas fa-chevron-down ps-dropdown-icon"></i>
                        </div>
                        <div className="ps-dropdown-content" id="accountManagementDropdown">

                            <div className="ps-dropdown-item-setting">
                                <span>Delete Account</span>
                                <button className="ps-manage-btn" data-modal-target="deleteAccountModal">Manage</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div id="changePasswordModal" className="ps-modal-overlay">
                <div className="ps-modal-content">
                    <span className="ps-close-button">&times;</span>
                    <h3>Change Password</h3>
                    <form>
                        <div className="ps-form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" name="currentPassword" required />
                        </div>
                        <div className="ps-form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" id="newPassword" name="newPassword" required />
                        </div>
                        <div className="ps-form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required />
                        </div>
                        <button type="submit" name="submit" className="ps-modal-save-btn">Save Changes</button>
                    </form>
                </div>
            </div>

            <div id="deleteAccountModal" className="ps-modal-overlay">
                <div className="ps-modal-content">
                    <span className="ps-close-button">&times;</span>
                    <h3>Delete Account</h3>
                    <p>Are you absolutely sure you want to delete your account? This action is irreversible.</p>
                    <button className="ps-modal-delete-btn">Delete Account</button>
                </div>
            </div>
        </>
    )
}
