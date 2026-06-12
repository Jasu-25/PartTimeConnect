import { useContext, useRef, useState } from 'react'
import { SeekerHeader } from './SeekerHeader'
import './SeekerSettings.css'
import { Requireddata } from '../../main';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getInitials } from '../../Utils/seekerutils';
export function SeekerSettings() {

    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let [isPasswordLoading, setIsPasswordLoading] = useState(false);
    let [validationMessage, setValidationMessage] = useState('');
    let logindirect = useNavigate();
    let settingsexpandref = useRef(null);
    let acctionexpandref = useRef(null);
    let passwordmanageref = useRef(null);
    let deletemanageref = useRef(null);
    function expand(e) {
        let selectorvalue = e.currentTarget.dataset.expanddiv;
        const expandsettings = settingsexpandref.current;
        const expandaccount = acctionexpandref.current;

        if (selectorvalue === "settings") {


            if (!expandsettings) return;

            if (expandsettings.classList.contains("expanded")) {
                expandsettings.classList.remove("expanded");
            } else {
                expandsettings.classList.add("expanded");
            }
        }
        else if (selectorvalue === "account") {
            if (!expandaccount) return;

            if (expandaccount.classList.contains("expanded")) {
                expandaccount.classList.remove("expanded");
            } else {
                expandaccount.classList.add("expanded");
            }
        }
    }

    function handlepassword() {
        if (passwordmanageref.current.classList.contains("show")) {
            passwordmanageref.current.classList.remove("show");
            setValidationMessage('');
            setIsPasswordLoading(false);
        }
        else {
            passwordmanageref.current.classList.add("show");
        }
    }

    function handleaccount() {
        if (deletemanageref.current.classList.contains("show")) {
            deletemanageref.current.classList.remove("show");
        }
        else {
            deletemanageref.current.classList.add("show");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setValidationMessage('');

        const form = e.target;
        const current = (form.currentPassword && form.currentPassword.value) || '';
        const newPass = (form.newPassword && form.newPassword.value) || '';
        const confirm = (form.confirmPassword && form.confirmPassword.value) || '';

        if (current.length < 8) {
            setValidationMessage('Current password must be at least 8 characters.');
            return;
        }

        if (newPass !== confirm) {
            setValidationMessage('New password and confirmation do not match.');
            return;
        }

        if (newPass === current) {
            setValidationMessage('New password and current should not be same.')
            return
        }

        setIsPasswordLoading(true);
        try {
            let result = await axios.post('/PartTimeConnect-Backend/change_pass_seeker.php', {
                current: current,
                newpassword: newPass
            });
            if (result.data.status === "error") {
                setTimeout(() => {
                    setValidationMessage('Current Password is Incorrect.');
                    setIsPasswordLoading(false);
                }, 2000);
            }
            else if (result.data.status === "dberror") {
                setTimeout(() => {
                    setValidationMessage('Failed to Update Try again');
                    setIsPasswordLoading(false);
                }, 2000);
            }
            else {

                setTimeout(() => {
                    setIsPasswordLoading(false);
                    setValidationMessage('Password changed successfully.');
                }, 3000);

                setTimeout(() => {
                    handlepassword();
                }, 4200);
            }
        } catch (err) {
            setValidationMessage('Failed to change password. Please try again.', err);
        }
    }


    async function handleDelete(e) {
        e.preventDefault();
        setValidationMessage('');
        setIsPasswordLoading(true);
        try {
            let result = await axios.post('/PartTimeConnect-Backend/delete_account_seeker.php');
            if (result.data.status === "error") {
                setTimeout(() => {
                    setIsPasswordLoading(false)
                    setValidationMessage('Account Deletion Failed')
                }, 2000);
            }
            else {
                setTimeout(() => {
                    setIsPasswordLoading(false);
                    setValidationMessage('Redirecting to Login.');
                }, 3000);

                setTimeout(() => {
                    handleaccount();
                    logindirect('/jobseekerlogin')
                }, 4200);
            }
        } catch (err) {
            setValidationMessage('Failed to change password. Please try again.', err);
        }
    }

    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <div className="seekersettings">
                <SeekerHeader />
                <main className="settings-container">
                    <div className="profile-header">
                        <div className="profile-avatar-container">
                            <h3 id="profileAvatarPreview" className="profile-avatar-large">{getInitials(Seekerdata?.name)}</h3>
                        </div>
                        <h1 className="profile-name-display">{Seekerdata?.name}</h1>
                    </div>

                    <div className="settings-card">
                        <h2>Profile Settings</h2>

                        <div className="setting-section">
                            <div className="section-header " id="securitySettingsHeader" ref={settingsexpandref} data-expanddiv="settings" onClick={expand}>
                                <h3>Security Settings</h3>
                                <i className="fas fa-chevron-down dropdown-icon"></i>
                            </div>
                            <div className="dropdown-content" id="securitySettingsDropdown">
                                <div className="dropdown-item-setting">
                                    <span>Change Password</span>
                                    <button className="manage-btn" data-modal-target="changePasswordModal" onClick={handlepassword}>Manage</button>
                                </div>
                            </div>
                        </div>

                        <div className="setting-section">
                            <div className="section-header" id="accountManagementHeader" data-expanddiv="account" ref={acctionexpandref} onClick={expand}>
                                <h3>Account Management</h3>
                                <i className="fas fa-chevron-down dropdown-icon"></i>
                            </div>
                            <div className="dropdown-content" id="accountManagementDropdown">
                                <div className="dropdown-item-setting">
                                    <span>Delete Account</span>
                                    <button className="manage-btn" data-modal-target="deleteAccountModal" onClick={handleaccount}>Manage</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <div id="changePasswordModal" className="modal-overlay " ref={passwordmanageref}>
                    <div className="modal-content">
                        <span className="close-button" onClick={handlepassword}>&times;</span>
                        <h3>Change Password</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input type="password" id="currentPassword" name="currentPassword" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input type="password" id="newPassword" name="newPassword" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required />
                            </div>
                            <p id="validationMessage" className="validation-message">{validationMessage}</p>
                            <button type="submit" name="submit" className={`modal-save-btn ${isPasswordLoading ? 'modal-save-btn-loading' : ''}`} disabled={isPasswordLoading}>
                                {isPasswordLoading ? 'Saving...' : 'Save Changes'}
                                <i className={`fas ${isPasswordLoading ? 'fa-spinner' : 'fas fa-paper-plane'}`}></i>
                            </button>
                        </form>
                    </div>
                </div>


                <div id="deleteAccountModal" className="modal-overlay" ref={deletemanageref}>
                    <div className="modal-content">
                        <span className="close-button" onClick={handleaccount}>&times;</span>
                        <h3>Delete Account</h3>
                        <p>Are you absolutely sure you want to delete your account? This action is irreversible.</p>
                        <p>{validationMessage}</p>
                        <button className={`modal-delete-btn ${isPasswordLoading ? 'modal-delete-btn-loading' : ''}`} disabled={isPasswordLoading} onClick={handleDelete}>
                            {isPasswordLoading ? 'Deleting...' : 'Delete Account '}
                            <i className={`${isPasswordLoading ? 'fas fa-spinner' : 'fa-solid fa-trash'}`}></i></button>
                    </div>
                </div>
            </div>
        );
    }
} 
