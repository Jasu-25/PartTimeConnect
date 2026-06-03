import React, { useEffect, useState } from 'react'
import { ProviderHeader } from './ProviderHeader'
import './ProviderProfileUpdate.css'
import axios from 'axios'
import { getInitials } from '../../Utils/seekerutils'

export function ProviderProfileUpdate() {


    const [form, setForm] = useState({
        companyName: 'TechCorp',
        contactEmail: 'contact@techcorp.com',
        companyDescription:
            'We are a leading technology company focused on innovation and excellence in software development.',
        contactPhone: null,
        location: '123 Tech Street, San Francisco, CA',
        address: ''
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validators = {
        companyName: (v = '') =>
            v.trim() ? '' : 'Company name is required.',

        contactEmail: (v = '') =>
            /^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address.',

        companyDescription: (v = '') =>
            v.trim().length >= 20
                ? ''
                : 'Description must be at least 20 characters.',

        contactPhone: (v = '') => {
            if (v === '') return ''
            return /^\d{10}$/.test(v)
                ? ''
                : 'Phone must be 10 digits (numbers only).'
        },

        location: (v = '') =>
            v.trim() ? '' : 'Location is required.',

        address: (v = '') =>
            v.trim() ? '' : 'Address is required.'
    }

    function validateField(name, value) {
        const fn = validators[name]
        return fn ? fn(value) : ''
    }

    function handleChange(e) {
        const { name, value } = e.target

        const keyMap = {
            'company-name': 'companyName',
            'contact-email': 'contactEmail',
            'company-description': 'companyDescription',
            'contact-phone': 'contactPhone',
            location: 'location',
            address: 'address'
        }

        const key = keyMap[name] || name

        if (key === 'contactPhone' && value !== '' && !/^\d*$/.test(value)) {
            return
        }

        setForm(prev => ({ ...prev, [key]: value }))

        const err = validateField(key, value)
        setErrors(prev => ({ ...prev, [key]: err }))
    }

    function validateAll() {
        const nextErrors = {}

        Object.keys(validators).forEach(k => {
            nextErrors[k] = validateField(k, form[k] ?? '')
        })

        setErrors(nextErrors)

        return !Object.values(nextErrors).some(Boolean)
    }

    async function GetProfileData() {
        let respose = await axios.get('/backend/get_provider.php', {
            withCredentials: true
        });
        console.log(respose.data);
        setForm(() => ({
            companyName: respose?.data?.user?.company_name,
            contactEmail: respose?.data?.user?.email,
            companyDescription: respose?.data?.user?.company_description,
            contactPhone: respose?.data?.user?.contact_number,
            location: respose?.data?.user?.location,
            address: respose?.data?.user?.address
        }))
    }

    useEffect(() => {
        GetProfileData();
    }, []);


    async function handleSubmit(e) {
        e.preventDefault()

        if (!validateAll()) return

        setLoading(true)
        let respose = null
        try {
            respose = await axios.post('/backend/update-provider-profile.php', {
                withCredentials: true,
                companyname: form.companyName,
                email: form.contactEmail,
                description: form.companyDescription,
                phone: form.contactPhone,
                location: form.location,
                address: form.address
            });
        } catch (err) {
            console.error('Update failed', err);
        }

        console.log(respose?.data);

        if (respose?.data?.status === 'success') {
            setTimeout(() => {
                setLoading(false)
                window.location.href='/providerprofile';
            },2000);
        }

    }




    return (
        <div className="providerprofileupdate">
            <ProviderHeader />

            <div className="main-container">
                <section className="company-header">
                    <div className="company-logo-container">
                        <h3 className="company-logo">{getInitials(form.companyName)}</h3>
                    </div>

                    <div className="company-info">
                        <h1 className="company-name">{form.companyName || 'T'}</h1>
                        <div className="company-details">
                            <span className="company-location">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="company-loaction">
                                    {form.location || 'San Francisco, CA'}
                                </span>
                            </span>
                        </div>
                    </div>
                </section>

                <div className="settings-container">
                    <div className="settings-card">
                        <h2 className="settings-title">Company Profile</h2>

                        <form
                            id="company-settings-form"
                            className="settings-form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        htmlFor="company-name"
                                        className="form-label"
                                    >
                                        <i className="fas fa-building"></i>
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company-name"
                                        name="company-name"
                                        value={form.companyName}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors.companyName && (
                                        <span className="error">
                                            {errors.companyName}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="contact-email"
                                        className="form-label"
                                    >
                                        <i className="fas fa-envelope"></i>
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="contact-email"
                                        value={form.contactEmail ?? ''}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors.contactEmail && (
                                        <span className="error">
                                            {errors.contactEmail}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="company-description"
                                    className="form-label"
                                >
                                    <i className="fas fa-align-left"></i>
                                    Company Description
                                </label>
                                <textarea
                                    id="company-description"
                                    name="company-description"
                                    rows="4"
                                    className="form-textarea"
                                    placeholder="Tell us about your company..."
                                    value={form.companyDescription}
                                    onChange={handleChange}
                                />
                                {errors.companyDescription && (
                                    <span className="error">
                                        {errors.companyDescription}
                                    </span>
                                )}
                            </div>



                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        htmlFor="contact-phone"
                                        className="form-label"
                                    >
                                        <i className="fas fa-phone"></i>
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact-phone"
                                        name="contact-phone"
                                        maxLength="10"
                                        className="form-input"
                                        value={form.contactPhone ?? ''}
                                        onChange={handleChange}
                                    />
                                    {errors.contactPhone && (
                                        <span className="error">
                                            {errors.contactPhone}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="location"
                                        className="form-label"
                                    >
                                        <i className="fas fa-map-marker-alt"></i>
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors.location && (
                                        <span className="error">
                                            {errors.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="address"
                                    className="form-label"
                                >
                                    <i className="fas fa-address-book"></i>
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="3"
                                    className="form-textarea"
                                    placeholder="Enter full address..."
                                    value={form.address}
                                    onChange={handleChange}
                                />
                                {errors.address && (
                                    <span className="error">
                                        {errors.address}
                                    </span>
                                )}
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    name="submit"
                                    className={`btn-save ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        'Saving...'
                                    ) : (
                                        <><i className="fas fa-save"></i> Save Changes</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}