import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

import ProfileHeader from "./components/ProfileHeader";
import ProfileNavigation from "./components/ProfileNavigation";
import ProfileOverview from "./components/overview/ProfileOverview";
import RentedMovies from "./components/rented/RentedMovies";
import Collections from "./components/collections/Collections";
import MyComments from "./components/comments/MyComments";
import AccountSettings from "./components/account/AccountSettings";

function Profile() {
  const [activeSection, setActiveSection] = useState("overview");
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  const showOverview = () => {
    setActiveSection("overview");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        setProfileUser(data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const renderSection = () => {
    switch (activeSection) {
      case "rented":
        return <RentedMovies onBack={showOverview} />;

      case "collections":
        return <Collections onBack={showOverview} />;

      case "comments":
        return <MyComments onBack={showOverview} />;

      case "account":
        return <AccountSettings onBack={showOverview} />;

      case "overview":
      default:
        return <ProfileOverview onSectionChange={setActiveSection} />;
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">Loading profile...</div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-fluid-bg">
        <div className="fluid-mesh-canvas" />
      </div>

      <section className="profile-hero-section">
        <div className="profile-hero-inner">
          <ProfileHeader user={profileUser} />
        </div>
      </section>

      <div className="profile-main">
        <ProfileNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="profile-content" key={activeSection}>
          {renderSection()}
        </div>
      </div>
    </main>
  );
}

export default Profile;
