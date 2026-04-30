import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import "./Profile.css";

function Profile() {
  const { user, updateProfile } = useAuth();
  const fullNameInputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [originalForm, setOriginalForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const nextForm = {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    };
    setForm(nextForm);
    setOriginalForm(nextForm);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsEditing(true);
    requestAnimationFrame(() => {
      fullNameInputRef.current?.focus();
      fullNameInputRef.current?.select();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    const hasChanges =
      form.fullName.trim() !== originalForm.fullName.trim() ||
      form.email.trim() !== originalForm.email.trim() ||
      form.phone.trim() !== originalForm.phone.trim() ||
      form.password.trim().length > 0;

    if (!hasChanges) {
      setIsEditing(false);
      setSuccessMessage("No changes to save.");
      setIsSaving(false);
      return;
    }

    try {
      await updateProfile({
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });

      const refreshedForm = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: "",
      };

      setForm(refreshedForm);
      setOriginalForm(refreshedForm);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Could not update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page-shell">
      <ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="profile"
      />

      <main className="profile-content">
        <ProfileHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="profile-main-grid">
          <section>
            <h1 className="profile-title">Profile</h1>

            <div className="profile-info-card">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  form.fullName
                )}&background=0f766e&color=ffffff`}
                alt="Profile avatar"
                className="profile-avatar"
              />
              <div>
                <h2 className="profile-name">{form.fullName}</h2>
                <p className="profile-meta mb-1">{form.email}</p>
                <p className="profile-meta mb-0">{form.phone}</p>
              </div>
            </div>

            <form className="profile-form-card mt-4" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="alert alert-danger py-2" role="alert">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success py-2" role="alert">
                  {successMessage}
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label profile-label">Full Name</label>
                  <input
                    ref={fullNameInputRef}
                    type="text"
                    name="fullName"
                    className="form-control profile-input"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label profile-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control profile-input"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label profile-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control profile-input"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label profile-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control profile-input"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter new password (optional)"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn profile-btn" disabled={isSaving}>
                    {isSaving ? (
                      <><i className="bi bi-hourglass-split me-2"></i>Saving...</>
                    ) : (
                      <><i className="bi bi-check-circle-fill me-2"></i>Save Changes</>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setForm(originalForm);
                      setIsEditing(false);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            {!isEditing && (
              <button
                type="button"
                className="btn profile-btn mt-4"
                onClick={handleEditClick}
              >
                <i className="bi bi-pencil-fill me-2"></i>Edit Profile
              </button>
            )}
          </section>

          <aside className="profile-contact-card">
            <h3 className="contact-side-title">Quick Contact</h3>
            <div className="contact-item">
              <i className="bi bi-geo-alt-fill" />
              <span>Bhopal, Madhya Pradesh</span>
            </div>
            <div className="contact-item">
              <i className="bi bi-envelope-fill" />
              <span>{form.email}</span>
            </div>
            <div className="contact-item">
              <i className="bi bi-telephone-fill" />
              <span>{form.phone}</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Profile;
