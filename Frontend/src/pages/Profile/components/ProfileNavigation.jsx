import "./ProfileNavigation.css";

function ProfileNavigation({ activeSection, onSectionChange }) {
  const sections = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "rented",
      label: "Rented Movies",
    },
    {
      id: "collections",
      label: "Collections",
    },
    {
      id: "comments",
      label: "My Comments",
    },
    {
      id: "account",
      label: "Account",
    },
  ];

  return (
    <nav className="profile-navigation">
      <div className="profile-navigation-inner">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={activeSection === section.id ? "active" : ""}
            onClick={() => onSectionChange(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default ProfileNavigation;
