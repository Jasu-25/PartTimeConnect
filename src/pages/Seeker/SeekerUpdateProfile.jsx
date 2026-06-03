import React, { useContext, useEffect, useState } from "react";
import { SeekerHeader } from "./SeekerHeader";
import './SeekerUpdateProfile.css'
import { Requireddata } from "../../main";
import axios from "axios";
import { getInitials } from "../../Utils/seekerutils";
import { useNavigate } from "react-router";

function Notification({ message, type = "info", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg =
    type === "error" ? "#f8d7da" :
      type === "warning" ? "#fff3cd" :
        "#d4edda";

  const color =
    type === "error" ? "#721c24" :
      type === "warning" ? "#856404" :
        "#155724";

  const border =
    type === "error" ? "#f5c6cb" :
      type === "warning" ? "#ffeaa7" :
        "#c3e6cb";

  const icon =
    type === "error"
      ? "fa-exclamation-circle"
      : type === "warning"
        ? "fa-exclamation-triangle"
        : "fa-info-circle";

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        right: "20px",
        background: bg,
        color,
        padding: "1rem 1.5rem",
        borderRadius: "8px",
        border: `1px solid ${border}`,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}
    >
      <i className={`fas ${icon}`}></i>
      {message}
    </div>
  );
}

export function SeekerUpdateProfile() {

  const { seekerData: Existingdata, refreshSeeker } = useContext(Requireddata);
  const [form, setForm] = useState({
    fullName: Existingdata?.name || '',
    email: Existingdata?.email || '',
    mobile: Existingdata?.phone || '',
    location: Existingdata?.location || '',
    age: Existingdata?.age || '',
    aboutMe: Existingdata?.about || '',
    availability: Existingdata?.availability || 'immediate',
  });

  let profilenavigate = useNavigate();
  // Helpers to parse incoming skills/education data
  const parseSkills = (skillsStringOrArray) => {
    if (!skillsStringOrArray) return [];
    if (Array.isArray(skillsStringOrArray)) return skillsStringOrArray.map(s => String(s).trim()).filter(Boolean);
    return String(skillsStringOrArray).split(',').map(s => s.trim()).filter(Boolean);
  };

  const parseEducations = (educationString, educationsArray) => {
    const normalizeObj = (e, i) => {
      if (typeof e === 'string') {
        const str = e.trim();
        // Pattern: "Degree at Institution (Year)"
        const m = str.match(/^(.*?)\s+at\s+(.*?)\s*\((.*?)\)\s*$/);
        if (m) return { id: Date.now() + i, degree: m[1].trim(), institution: m[2].trim(), year: m[3].trim() };
        // Pattern: "Degree - Institution - Year"
        const m2 = str.match(/^(.+?)\s*[-–]\s*(.+?)\s*[-–]\s*(.+)$/);
        if (m2) return { id: Date.now() + i, degree: m2[1].trim(), institution: m2[2].trim(), year: m2[3].trim() };
        // Fallback: put full string into degree
        return { id: Date.now() + i, degree: str, institution: '', year: '' };
      } else if (e && typeof e === 'object') {
        const degree = e.degree || e.qualification || e.course || e.title || e.name || '';
        const institution = e.institution || e.college || e.school || e.university || e.company || '';
        let year = '';
        if (e.year) year = e.year;
        else if (e.duration) year = e.duration;
        else if (e.from || e.start || e.startYear || e.fromYear) {
          const from = e.from || e.start || e.startYear || e.fromYear;
          const to = e.to || e.end || e.endYear || e.toYear;
          year = to ? `${from}-${to}` : String(from);
        }
        return { id: Date.now() + i, degree: String(degree).trim(), institution: String(institution).trim(), year: String(year).trim() };
      }
      return { id: Date.now() + i, degree: '', institution: '', year: '' };
    };

    if (Array.isArray(educationsArray) && educationsArray.length) {
      return educationsArray.map((e, i) => normalizeObj(e, i));
    }

    if (!educationString) return [];

    // Split entries: prefer '),', then ';', '|', newline, else comma
    let parts = [];
    if (String(educationString).includes('),')) {
      parts = String(educationString).split('),').map((p, idx, arr) => (idx < arr.length - 1 ? p + ')' : p)).map(p => p.trim()).filter(Boolean);
    } else if (String(educationString).includes(';')) {
      parts = String(educationString).split(';').map(p => p.trim()).filter(Boolean);
    } else if (String(educationString).includes('|')) {
      parts = String(educationString).split('|').map(p => p.trim()).filter(Boolean);
    } else if (String(educationString).includes('\n')) {
      parts = String(educationString).split('\n').map(p => p.trim()).filter(Boolean);
    } else {
      parts = String(educationString).split(',').map(p => p.trim()).filter(Boolean);
    }

    return parts.map((part, i) => normalizeObj(part, i));
  };

  useEffect(() => {
    setForm({
      fullName: Existingdata?.name || '',
      email: Existingdata?.email || '',
      mobile: Existingdata?.phone || '',
      location: Existingdata?.location || '',
      age: Existingdata?.age || '',
      aboutMe: Existingdata?.about || '',
      availability: Existingdata?.availability || 'immediate',
    });

    // populate skills and education from existing data (support both arrays and comma-strings)
    setSkills(parseSkills(Existingdata?.skills || Existingdata?.skillsString));

    // Use Existingdata.education as primary source (it may be an array or a string)
    const educationSource = Existingdata?.education;
    let parsedEds = [];
    if (Array.isArray(educationSource)) {
      parsedEds = parseEducations(null, educationSource);
    } else {
      parsedEds = parseEducations(educationSource || Existingdata?.educationString || Existingdata?.educations, Existingdata?.educations);
    }

    setEducations(parsedEds.length ? parsedEds : [{ id: Date.now(), degree: '', institution: '', year: '' }]);
  }, [Existingdata]);

  const [aboutCount, setAboutCount] = useState(0);

  const [educations, setEducations] = useState([
    {
      id: Date.now(),
      degree: '',
      institution: '',
      year: '',
    },
  ]);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  // Notification state + helper
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = 'info') => setNotification({ message, type });

  // Submission state to disable all inputs while saving
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAboutCount(form.aboutMe.length);
  }, [form.aboutMe]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    setEducations(prev => [
      ...prev,
      { id: Date.now() + Math.random(), degree: '', institution: '', year: '' },
    ]);
  };

  const removeEducation = (id) => {
    setEducations(prev => prev.filter(e => e.id !== id));
  };

  const updateEducation = (id, field, value) => {
    setEducations(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // prevent double submit

    // Validate About Me length
    if (form.aboutMe && form.aboutMe.length > 500) {
      showNotification('About Me exceeds the 500 character limit', 'error');
      return;
    }

    // Create comma-separated strings as requested
    const skillsString = skills.join(',');
    const educationString = educations
      .map((ed) => `${ed.degree || ''} at ${ed.institution || ''} (${ed.year || ''})`)
      .join(',');

    setSubmitting(true);
    showNotification('Saving profile...', 'info');
    try {
      const result = await axios.post('backend/update-seeker-profile.php', {
        name: form.fullName,
        email: form.email,
        phone: form.mobile,
        location: form.location,
        age: form.age,
        about: form.aboutMe,
        availability: form.availability,
        skills: skillsString,
        education: educationString,
      });
      if (result?.data?.status === 'error') {
        showNotification(result.data.message || 'Failed to save profile', 'error');
      } else {
        try {
          if (typeof refreshSeeker === 'function') await refreshSeeker();
        } catch (err) {
          console.error('Error refreshing seeker data', err);
        }
        setTimeout(() => {
          showNotification(result?.data?.message || 'Profile saved successfully!', 'info');
        }, 3000);

        setTimeout(() => {
          setSubmitting(false);
          profilenavigate('/seekerprofile')
        }, 4000);
      }
    } catch (err) {
      showNotification(err.message || 'Network error', 'error');
    }
  };

  return (
    <>
      <SeekerHeader />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="main-container">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar-circle">
              <h3 id="profile-avatar-display">{getInitials(form.fullName)}</h3>
            </div>
          </div>
          <h1 className="profile-name-display">{form.fullName || 'Your Name'}</h1>
        </div>

        <div className="settings-container">
          <div className="settings-card">
            <h2 className="settings-title">Profile Settings</h2>

            <form id="profile-settings-form" className="settings-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="full-name" className="form-label">
                    <i className="fas fa-user"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">
                    <i className="fas fa-phone"></i>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    maxLength={10}
                    value={form.mobile}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">
                    <i className="fas fa-map-marker-alt"></i>
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age" className="form-label">
                    <i className="fas fa-birthday-cake"></i>
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    maxLength={3}
                    value={form.age}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="about-me" className="form-label">
                  <i className="fas fa-user-tie"></i>
                  About Me
                </label>
                <textarea
                  id="about-me"
                  name="aboutMe"
                  className="form-textarea"
                  rows={5}
                  maxLength={500}
                  placeholder="Write a compelling professional summary (max 500 characters)"
                  value={form.aboutMe}
                  onChange={handleInputChange}
                  disabled={submitting}
                ></textarea>
                <small className="char-count-display">
                  {aboutCount} / 500 characters
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="education" className="form-label">
                  <i className="fas fa-graduation-cap"></i>
                  Education
                </label>

                <div className="education-container" id="education">
                  {educations.map((edu) => (
                    <div className="education-entry" key={edu.id}>
                      <div className="education-row">
                        <input
                          type="text"
                          placeholder="Degree/Certification"
                          className="form-input education-degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          disabled={submitting}
                        />
                        <input
                          type="text"
                          placeholder="Institution"
                          className="form-input education-institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          disabled={submitting}
                        />
                      </div>

                      <div className="education-row">
                        <input
                          type="text"
                          placeholder="Year (e.g., 2024-2025)"
                          className="form-input education-year"
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                          disabled={submitting}
                        />
                        <button
                          type="button"
                          className="btn-remove-education"
                          onClick={() => { if (!submitting) removeEducation(edu.id) }}
                          disabled={submitting}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" className="btn-add-education" onClick={() => { if (!submitting) addEducation() }} disabled={submitting}>
                  <i className="fas fa-plus"></i>
                  Add Education
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="skills-input" className="form-label">
                  <i className="fas fa-tools"></i>
                  Skills
                </label>

                <div className="skills-container">
                  <div className="skills-input-container">
                    <input
                      type="text"
                      id="skills-input"
                      placeholder="Type a skill and press Enter"
                      className="form-input"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = skillInput.trim();
                          if (!val) {
                            showNotification('Please enter a skill', 'warning');
                            return;
                          }
                          const exists = skills.some(s => String(s).toLowerCase() === val.toLowerCase());
                          if (exists) {
                            showNotification('Skill already added!', 'warning');
                            setSkillInput('');
                            return;
                          }
                          setSkills(prev => [...prev, val]);
                          setSkillInput('');
                        }
                      }}
                      disabled={submitting}
                    />
                    <div className="skills-suggestions"></div>
                  </div>

                  <div className="skills-tags">
                    {skills.length === 0 && <small className="muted">No skills added yet</small>}
                    {skills.map((s, idx) => (
                      <span className="skill-tag" key={idx}>
                        {s} <i className="fas fa-times" onClick={() => { if (!submitting) removeSkill(idx) }} style={{ cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1 }}></i>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="availability" className="form-label">
                  <i className="fas fa-calendar-check"></i>
                  Availability
                </label>

                <select
                  id="availability"
                  name="availability"
                  className="form-select"
                  value={form.availability}
                  onChange={(e) => setForm(prev => ({ ...prev, availability: e.target.value }))}
                  disabled={submitting}
                >
                  <option value="immediate">
                    Available Immediately
                  </option>
                  <option value="1-week">1 Week Notice</option>
                  <option value="2-weeks">2 Weeks Notice</option>
                  <option value="1-month">1 Month Notice</option>
                </select>


              </div>

              <div className="form-actions">
                <button type="submit" className={`btn-save ${submitting ? 'loading' : ''}`} disabled={submitting}>
                  {submitting ? (<><i className="fas fa-spinner fa-spin"></i> Saving...</>) : (<><i className="fas fa-save"></i> Save Changes</>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
