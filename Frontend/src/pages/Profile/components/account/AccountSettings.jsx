import "./AccountSettings.css";

function AccountSettings({ onBack }) {
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

      <div className="account-setting-item">
        <div>
          <strong>Profile information</strong>

          <span>Update your name, email and profile image.</span>
        </div>

        <button type="button">Edit →</button>
      </div>

      <div className="account-setting-item">
        <div>
          <strong>Password & Security</strong>

          <span>Manage your CineLend account password.</span>
        </div>

        <button type="button">Manage →</button>
      </div>
    </section>
  );
}

export default AccountSettings;
