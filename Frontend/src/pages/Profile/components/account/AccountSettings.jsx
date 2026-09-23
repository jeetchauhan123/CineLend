import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import "./AccountSettings.css";

function AccountSettings({ onBack }) {
  const { user, token, logout, updateUser } = useAuth();

  const [openSection, setOpenSection] = useState(null);

  // Profile
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Delete account
  const [deleteStep, setDeleteStep] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      name: user.name || "",
      email: user.email || "",
      profileImage: user.profileImage || "",
    });
  }, [user]);

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? null : section));

    setProfileMessage("");
    setProfileError("");
    setPasswordMessage("");
    setPasswordError("");
  };

  // =========================
  // PROFILE
  // =========================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetProfileForm = () => {
    setProfileForm({
      name: user?.name || "",
      email: user?.email || "",
      profileImage: user?.profileImage || "",
    });

    setProfileMessage("");
    setProfileError("");
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    if (!profileForm.name.trim()) {
      setProfileError("Name is required.");
      return;
    }

    if (!profileForm.email.trim()) {
      setProfileError("Email is required.");
      return;
    }

    try {
      setProfileLoading(true);
      setProfileMessage("");
      setProfileError("");

      const response = await fetch("http://localhost:3000/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileForm.name.trim(),
          email: profileForm.email.trim(),
          profileImage: profileForm.profileImage.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      if (updateUser) {
        updateUser(data.user);
      }

      setProfileForm({
        name: data.user.name || "",
        email: data.user.email || "",
        profileImage: data.user.profileImage || "",
      });

      setProfileMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);

      setProfileError(error.message || "Unable to update your profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // =========================
  // PASSWORD
  // =========================

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetPasswordForm = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("");
    setPasswordError("");
  };

  const changePassword = async (event) => {
    event.preventDefault();

    if (!passwordForm.currentPassword) {
      setPasswordError("Enter your current password.");
      return;
    }

    if (!passwordForm.newPassword) {
      setPasswordError("Enter a new password.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordMessage("");
      setPasswordError("");

      const response = await fetch("http://localhost:3000/users/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      resetPasswordForm();
      setPasswordMessage("Password changed successfully.");
    } catch (error) {
      console.error("Change password error:", error);

      setPasswordError(error.message || "Unable to change your password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // =========================
  // DELETE ACCOUNT
  // =========================

  const startDeleteAccount = () => {
    setDeleteError("");
    setDeletePassword("");
    setDeleteStep("confirm");
  };

  const cancelDelete = () => {
    if (deleteLoading) return;

    setDeleteStep(null);
    setDeletePassword("");
    setDeleteError("");
  };

  const confirmDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setDeleteError("Enter your password to continue.");
      return;
    }

    try {
      setDeleteLoading(true);
      setDeleteError("");

      const response = await fetch("http://localhost:3000/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: deletePassword,
          confirmRentalDeletion: deleteStep === "rental-warning",
        }),
      });

      const data = await response.json();

      /*
       * The backend found an active rental.
       * The account has NOT been deleted.
       */
      if (response.status === 409 && data.hasActiveRental) {
        setDeleteStep("rental-warning");
        setDeleteError("");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      /*
       * Account was permanently deleted.
       */
      logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Delete account error:", error);

      setDeleteError(error.message || "Unable to delete your account.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="account-settings">
      <button type="button" className="account-back-btn" onClick={onBack}>
        <span>←</span>
        Back to Overview
      </button>

      <div className="account-header">
        <div>
          <span>ACCOUNT</span>

          <h2>Account Settings</h2>

          <p>Manage your personal information and account security.</p>
        </div>
      </div>

      {/* =========================
          PROFILE INFORMATION
      ========================= */}

      <div className="account-setting-item">
        <div>
          <strong>Profile information</strong>

          <span>Update your name, email and profile image.</span>
        </div>

        <button type="button" onClick={() => toggleSection("profile")}>
          {openSection === "profile" ? "Close" : "Edit →"}
        </button>
      </div>

      {openSection === "profile" && (
        <form className="account-setting-panel" onSubmit={updateProfile}>
          <div className="account-form-grid">
            <label className="account-field">
              <span>Name</span>

              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                placeholder="Your name"
              />
            </label>

            <label className="account-field">
              <span>Email</span>

              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Your email"
              />
            </label>

            <label className="account-field account-field-full">
              <span>Profile image URL</span>

              <input
                type="url"
                name="profileImage"
                value={profileForm.profileImage}
                onChange={handleProfileChange}
                placeholder="https://example.com/profile.jpg"
              />
            </label>
          </div>

          {profileError && (
            <div className="account-form-error">{profileError}</div>
          )}

          {profileMessage && (
            <div className="account-form-success">{profileMessage}</div>
          )}

          <div className="account-form-actions">
            <button
              type="button"
              className="account-secondary-btn"
              onClick={resetProfileForm}
              disabled={profileLoading}
            >
              Reset
            </button>

            <button
              type="submit"
              className="account-primary-btn"
              disabled={profileLoading}
            >
              {profileLoading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}

      {/* =========================
          PASSWORD & SECURITY
      ========================= */}

      <div className="account-setting-item">
        <div>
          <strong>Password & Security</strong>

          <span>Manage your CineLend account password.</span>
        </div>

        <button type="button" onClick={() => toggleSection("password")}>
          {openSection === "password" ? "Close" : "Manage →"}
        </button>
      </div>

      {openSection === "password" && (
        <form className="account-setting-panel" onSubmit={changePassword}>
          <div className="account-password-fields">
            <label className="account-field">
              <span>Current password</span>

              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current password"
              />
            </label>

            <label className="account-field">
              <span>New password</span>

              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="New password"
              />
            </label>

            <label className="account-field">
              <span>Confirm new password</span>

              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </label>
          </div>

          <p className="account-password-hint">
            Your new password must contain at least 6 characters.
          </p>

          {passwordError && (
            <div className="account-form-error">{passwordError}</div>
          )}

          {passwordMessage && (
            <div className="account-form-success">{passwordMessage}</div>
          )}

          <div className="account-form-actions">
            <button
              type="button"
              className="account-secondary-btn"
              onClick={resetPasswordForm}
              disabled={passwordLoading}
            >
              Clear
            </button>

            <button
              type="submit"
              className="account-primary-btn"
              disabled={passwordLoading}
            >
              {passwordLoading ? "Changing..." : "Change password"}
            </button>
          </div>
        </form>
      )}

      {/* =========================
          DANGER ZONE
      ========================= */}

      <div className="account-danger-zone">
        <div className="account-danger-content">
          <span className="account-danger-label">DANGER ZONE</span>

          <strong>Delete Account</strong>

          <p>
            Permanently delete your CineLend account and all associated data.
            This action cannot be undone.
          </p>
        </div>

        <button
          type="button"
          className="account-delete-btn"
          onClick={startDeleteAccount}
        >
          Delete Account
        </button>
      </div>

      {/* =========================
          DELETE CONFIRMATION
      ========================= */}

      {deleteStep && (
        <div className="account-delete-overlay">
          <div
            className="account-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
          >
            {deleteStep === "confirm" ? (
              <>
                <span className="delete-modal-label">DELETE ACCOUNT</span>

                <h3 id="delete-account-title">Are you sure?</h3>

                <p>
                  This will permanently delete your CineLend account and all of
                  your saved data.
                </p>

                <div className="delete-modal-warning">
                  <strong>This cannot be undone.</strong>

                  <span>
                    Your collections, likes, comments, rental history and
                    account information will be permanently removed.
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="delete-modal-label">ACTIVE RENTAL</span>

                <h3 id="delete-account-title">You have an ongoing rental</h3>

                <p>
                  Your account currently has an active rental. Deleting your
                  account will permanently remove your account and end your
                  access to this rental.
                </p>

                <div className="delete-modal-warning rental-warning">
                  <strong>Your rental progress will be lost.</strong>

                  <span>
                    You will lose access to the ongoing rental, rental history,
                    saved collections, likes, comments and all other CineLend
                    account data. This cannot be recovered after deletion.
                  </span>
                </div>
              </>
            )}

            <label className="delete-password-label">
              Enter your password to continue
              <input
                type="password"
                value={deletePassword}
                onChange={(event) => setDeletePassword(event.target.value)}
                placeholder="Your password"
                disabled={deleteLoading}
                autoFocus
              />
            </label>

            {deleteError && (
              <div className="delete-modal-error">{deleteError}</div>
            )}

            <div className="delete-modal-actions">
              <button
                type="button"
                className="delete-cancel-btn"
                onClick={cancelDelete}
                disabled={deleteLoading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-btn"
                onClick={confirmDeleteAccount}
                disabled={deleteLoading}
              >
                {deleteLoading
                  ? "Deleting..."
                  : deleteStep === "rental-warning"
                    ? "Delete Anyway"
                    : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountSettings;
