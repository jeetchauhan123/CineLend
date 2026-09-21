const PRICING_TIERS = [
  {
    name: "Classic",
    minYear: null,
    maxYear: 1925,
    baseDailyPrice: 1,
  },
  {
    name: "Vintage",
    minYear: 1926,
    maxYear: 1955,
    baseDailyPrice: 1.5,
  },
  {
    name: "Modern",
    minYear: 1956,
    maxYear: 1985,
    baseDailyPrice: 2,
  },
  {
    name: "Recent",
    minYear: 1986,
    maxYear: null,
    baseDailyPrice: 3,
  },
];

const RENTAL_PACKAGES = [
  {
    id: "day",
    name: "1 Day",
    days: 1,
    multiplier: 1,
  },
  {
    id: "week",
    name: "1 Week",
    days: 7,
    multiplier: 6,
  },
  {
    id: "month",
    name: "1 Month",
    days: 30,
    multiplier: 23,
  },
  {
    id: "three-months",
    name: "3 Months",
    days: 90,
    multiplier: 75,
  },
  {
    id: "six-months",
    name: "6 Months",
    days: 180,
    multiplier: 150,
  },
  {
    id: "year",
    name: "1 Year",
    days: 365,
    multiplier: 300,
  },
];

const getPricingTier = (releaseYear) => {
  const year = Number(releaseYear);

  return PRICING_TIERS.find(
    (tier) =>
      (tier.minYear === null || year >= tier.minYear) &&
      (tier.maxYear === null || year <= tier.maxYear),
  );
};

const calculateRentalPrice = (releaseYear, duration) => {
  const tier = getPricingTier(releaseYear);

  if (!tier) {
    throw new Error("Movie release year is outside the supported range");
  }

  if (!duration || duration.type === "custom") {
    const days = Number(duration?.days);

    if (!Number.isInteger(days) || days <= 0) {
      throw new Error(
        "Custom rental duration must be a positive number of days",
      );
    }

    return {
      tier: tier.name,
      baseDailyPrice: tier.baseDailyPrice,
      days,
      price: tier.baseDailyPrice * days,
    };
  }

  const rentalPackage = RENTAL_PACKAGES.find(
    (item) => item.id === duration.type,
  );

  if (!rentalPackage) {
    throw new Error("Invalid rental package");
  }

  return {
    tier: tier.name,
    baseDailyPrice: tier.baseDailyPrice,
    days: rentalPackage.days,
    price: tier.baseDailyPrice * rentalPackage.multiplier,
  };
};

module.exports = {
  PRICING_TIERS,
  RENTAL_PACKAGES,
  getPricingTier,
  calculateRentalPrice,
};
