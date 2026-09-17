import { useState } from "react";
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

  const showOverview = () => {
    setActiveSection("overview");
  };

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

  return (
    <main className="profile-page">
      {/* Shifting Fluid Gradient Background */}
      <div className="profile-fluid-bg">
        <div className="fluid-mesh-canvas" />
      </div>

      <section className="profile-hero-section">
        <div className="profile-hero-inner">
          <ProfileHeader />
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