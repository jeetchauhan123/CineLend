import { useEffect, useState } from "react";
import "./RentalPanel.css";

const RentalPanel = ({ target, onClose, onContinue }) => {
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customDays, setCustomDays] = useState("");

  const isSingle = target.type === "single";

  useEffect(() => {
    setSelectedPackageId(null);
    setShowCustom(false);
    setCustomDays("");
  }, [target]);

  // Normalize the target so the rest of the component
  // always has a movies array to work with.
  const movies = isSingle
    ? [{ movie: target.movie, pricing: target.pricing }]
    : target.movies || [];

  const getPackage = (pricing, packageId) => {
    return pricing?.packages?.find(
      (rentalPackage) => rentalPackage.id === packageId,
    );
  };

  const packages = movies[0]?.pricing?.packages || [];

  const baseDailyPrice = movies[0]?.pricing?.baseDailyPrice || 0;

  const customDaysNumber = Number(customDays);

  const isCustomValid =
    Number.isInteger(customDaysNumber) && customDaysNumber > 0;

  const customSinglePrice = isCustomValid
    ? baseDailyPrice * customDaysNumber
    : 0;

  const customAllTotal =
    !isSingle && isCustomValid
      ? movies.reduce(
          (total, { pricing }) =>
            total + (pricing?.baseDailyPrice || 0) * customDaysNumber,
          0,
        )
      : 0;

  const handleContinue = () => {
    if (showCustom) {
      if (!isCustomValid) return;

      if (isSingle) {
        onContinue({
          type: "single",
          movie: target.movie,
          duration: {
            id: "custom",
            name: `${customDaysNumber} Days`,
            days: customDaysNumber,
            price: customSinglePrice,
          },
        });

        return;
      }

      const rentals = movies.map(({ movie, pricing }) => ({
        movie,
        duration: {
          id: "custom",
          name: `${customDaysNumber} Days`,
          days: customDaysNumber,
          price: (pricing?.baseDailyPrice || 0) * customDaysNumber,
        },
      }));

      onContinue({
        type: "all",
        rentals,
      });

      return;
    }

    if (!selectedPackageId) return;

    if (isSingle) {
      const rentalPackage = getPackage(target.pricing, selectedPackageId);

      if (!rentalPackage) return;

      onContinue({
        type: "single",
        movie: target.movie,
        duration: rentalPackage,
      });

      return;
    }

    const rentals = movies.map(({ movie, pricing }) => {
      const rentalPackage = getPackage(pricing, selectedPackageId);

      return {
        movie,
        duration: rentalPackage,
      };
    });

    onContinue({
      type: "all",
      rentals,
    });
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPackageId(packageId);
    setShowCustom(false);
  };

  const handleCustomOpen = () => {
    setSelectedPackageId(null);
    setShowCustom(true);
  };

  const handleBackToOffers = () => {
    setShowCustom(false);
    setCustomDays("");
    setSelectedPackageId(null);
  };

  return (
    <div className="rental-panel-backdrop" onClick={onClose}>
      <section
        className="rental-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="rental-panel-header">
          <div>
            <span className="rental-panel-eyebrow">
              {showCustom
                ? "CUSTOM RENTAL"
                : isSingle
                  ? "RENT MOVIE"
                  : "RENT ALL MOVIES"}
            </span>

            <h2>
              {isSingle ? target.movie.title : `Rent ${movies.length} movies`}
            </h2>

            <p>
              {showCustom
                ? "Choose exactly how many days you want to rent."
                : "Choose your rental duration."}
            </p>
          </div>

          <button
            type="button"
            className="rental-panel-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {!showCustom ? (
          <>
            <div className="rental-package-grid">
              {packages.map((rentalPackage) => {
                const isSelected = selectedPackageId === rentalPackage.id;

                return (
                  <button
                    key={rentalPackage.id}
                    type="button"
                    className={`rental-package-card ${
                      isSelected ? "is-selected" : ""
                    }`}
                    onClick={() => handlePackageSelect(rentalPackage.id)}
                  >
                    <span>{rentalPackage.name}</span>

                    <strong>
                      {isSingle
                        ? `₹${rentalPackage.price}`
                        : `₹${rentalPackage.price} / movie`}
                    </strong>

                    <small>
                      {rentalPackage.days}{" "}
                      {rentalPackage.days === 1 ? "day" : "days"}
                    </small>
                  </button>
                );
              })}

              <button
                type="button"
                className="rental-package-card rental-custom-card"
                onClick={handleCustomOpen}
              >
                <span>Custom</span>

                <strong>Choose your days</strong>

                <small>Set your own rental duration</small>
              </button>
            </div>

            {!isSingle && selectedPackageId && (
              <div className="rental-all-summary">
                <div className="rental-summary-heading">
                  <span>
                    {getPackage(movies[0]?.pricing, selectedPackageId)?.name}
                  </span>

                  <small>Per movie</small>
                </div>

                <div className="rental-all-movies">
                  {movies.map(({ movie, pricing }) => {
                    const rentalPackage = getPackage(
                      pricing,
                      selectedPackageId,
                    );

                    return (
                      <div className="rental-all-movie" key={movie._id}>
                        <span>{movie.title}</span>

                        <strong>₹{rentalPackage?.price ?? 0}</strong>
                      </div>
                    );
                  })}
                </div>

                <div className="rental-all-total">
                  <span>Total</span>

                  <strong>
                    ₹
                    {movies.reduce((total, { pricing }) => {
                      const rentalPackage = getPackage(
                        pricing,
                        selectedPackageId,
                      );

                      return total + (rentalPackage?.price || 0);
                    }, 0)}
                  </strong>
                </div>
              </div>
            )}

            {isSingle && selectedPackageId && (
              <div className="rental-selected-summary">
                <div>
                  <span>Selected duration</span>

                  <strong>
                    {getPackage(target.pricing, selectedPackageId)?.name}
                  </strong>
                </div>

                <strong>
                  ₹{getPackage(target.pricing, selectedPackageId)?.price ?? 0}
                </strong>
              </div>
            )}

            <button
              type="button"
              className="rental-continue-button"
              disabled={!selectedPackageId}
              onClick={handleContinue}
            >
              Continue to Checkout
            </button>
          </>
        ) : (
          <>
            <div className="custom-rental-card">
              <div className="custom-rental-top">
                <button
                  type="button"
                  className="custom-back-button"
                  onClick={handleBackToOffers}
                >
                  ← Back
                </button>

                <span>
                  {isSingle
                    ? `₹${baseDailyPrice}/day`
                    : "Price calculated per movie"}
                </span>
              </div>

              <div className="custom-rental-content">
                <label htmlFor="custom-days">Rental duration</label>

                <div className="custom-days-input">
                  <input
                    id="custom-days"
                    type="number"
                    min="1"
                    step="1"
                    value={customDays}
                    onChange={(event) => setCustomDays(event.target.value)}
                    placeholder="Enter number of days"
                    autoFocus
                  />

                  <span>days</span>
                </div>

                <p>
                  Enter the number of days you want to keep
                  {isSingle ? " this movie" : " each movie"}.
                </p>
              </div>

              {isCustomValid && (
                <div className="custom-rental-summary">
                  {isSingle ? (
                    <>
                      <div>
                        <span>
                          {customDaysNumber}{" "}
                          {customDaysNumber === 1 ? "day" : "days"}
                        </span>

                        <small>
                          ₹{baseDailyPrice} × {customDaysNumber} days
                        </small>
                      </div>

                      <strong>₹{customSinglePrice}</strong>
                    </>
                  ) : (
                    <>
                      <div className="custom-all-movies">
                        {movies.map(({ movie, pricing }) => {
                          const price =
                            (pricing?.baseDailyPrice || 0) * customDaysNumber;

                          return (
                            <div key={movie._id} className="custom-all-movie">
                              <span>{movie.title}</span>

                              <strong>₹{price}</strong>
                            </div>
                          );
                        })}
                      </div>

                      <div className="custom-all-total">
                        <span>Total</span>

                        <strong>₹{customAllTotal}</strong>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="rental-continue-button"
              disabled={!isCustomValid}
              onClick={handleContinue}
            >
              Continue to Checkout
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default RentalPanel;
