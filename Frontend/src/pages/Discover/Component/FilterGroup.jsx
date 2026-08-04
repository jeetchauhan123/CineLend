import "./FilterGroup.css";

function FilterGroup({
    title,
    isOpen,
    onToggle,
    children,
}) {
    return (
        <section className="filter-group">

            <button
                className="filter-group-header"
                onClick={onToggle}
            >
                <span>{title}</span>

                <span
                    className={
                        isOpen
                        ? "arrow open"
                        : "arrow"
                    }
                >
                    ▾
                </span>
            </button>

            {isOpen && (
                <div className="filter-group-body">
                    {children}
                </div>
            )}

        </section>
    );
}

export default FilterGroup;