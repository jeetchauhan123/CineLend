import { useEffect, useState } from "react";

import Skeleton from "../../../../components/Skeleton/Skeleton";

import "./MovieOverview.css";

const MovieOverview = ({ movie, loading }) => {
  const [overviewExpanded, setOverviewExpanded] =
    useState(false);

  useEffect(() => {
    setOverviewExpanded(false);
  }, [movie?._id]);

  const shortPlot =
    movie?.plot || movie?.fullplot || "";

  const fullPlot =
    movie?.fullplot &&
    movie.fullplot !== movie?.plot
      ? movie.fullplot
      : null;

  const shouldShowReadMore =
    Boolean(fullPlot) ||
    (!fullPlot && shortPlot.length > 420);

  const plot =
    shortPlot ||
    "No story description is available for this title.";

  return (
    <section className="movie-section movie-overview">
      <img
        className="movie-overview__decoration"
        src="/image4.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">
          THE STORY
        </span>

        <h2>Overview</h2>
      </div>

      {loading ? (
        <div className="movie-overview__skeleton">
          <Skeleton width="92%" height="18px" />
          <Skeleton width="84%" height="18px" />
          <Skeleton width="88%" height="18px" />
        </div>
      ) : (
        <div
          className={`movie-overview__content ${
            overviewExpanded ? "is-expanded" : ""
          }`}
        >
          <div className="movie-overview__text">
            <p>
              {overviewExpanded && fullPlot
                ? fullPlot
                : plot}
            </p>
          </div>

          {shouldShowReadMore && (
            <button
              type="button"
              className="movie-overview__more"
              onClick={() =>
                setOverviewExpanded(
                  (previous) => !previous
                )
              }
            >
              {overviewExpanded
                ? "Read less"
                : "Read more"}
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default MovieOverview;