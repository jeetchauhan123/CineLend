import { useAuth } from "../../../context/AuthContext";

import "./ProfileHeader.css";

function ProfileHeader() {
  const { user } = useAuth();

  const initial =
    user?.name?.trim()?.charAt(0).toUpperCase() || "U";

  return (
    <section className="profile-header">
      <div className="profile-header-content">
        <div className="profile-avatar-frame">
          <div className="profile-avatar">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>
        </div>

        <div className="profile-identity">
          <span className="profile-eyebrow">
            <span className="eyebrow-line" />
            PROFILE
            <span className="eyebrow-line" />
          </span>

          <h1>{user?.name || "Movie Lover"}</h1>

          <p>
            {user?.email || "No email available"}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="profile-edit-btn"
      >
        <span>Edit Account</span>
      </button>
    </section>
  );
}

export default ProfileHeader;