import { Link } from "react-router-dom";

import Skeleton from "../../../../components/Skeleton/Skeleton";

import "./MovieCastCrew.css";

const MovieCastCrew = ({ movie, loading }) => {
  const discoverLink = (param, value) =>
    `/discover?${new URLSearchParams({
      [param]: value,
    }).toString()}`;

  const renderPeople = (people, param, skeletonWidth = "180px") => {
    if (loading) {
      return (
        <Skeleton width={skeletonWidth} height="38px" borderRadius="999px" />
      );
    }

    if (!people?.length) {
      return <span>N/A</span>;
    }

    return people.map((person, index) => (
      <span className="movie-person-wrapper" key={person}>
        <Link
          className="movie-person movie-discover-link"
          to={discoverLink(param, person)}
        >
          {person}
        </Link>

        {index < people.length - 1 && (
          <span className="movie-person-separator">•</span>
        )}
      </span>
    ));
  };

  return (
    <section className="movie-section movie-cast-crew">
      <img
        className="movie-cast-crew__decoration"
        src="/chair.png"
        alt=""
        aria-hidden="true"
      />

      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">THE PEOPLE</span>

        <h2>Cast & Crew</h2>
      </div>

      <div className="movie-cast-crew__group">
        <h3>Cast</h3>

        <div className="movie-cast-crew__list">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  width="120px"
                  height="38px"
                  borderRadius="999px"
                />
              ))
            : renderPeople(movie?.cast, "cast")}
        </div>
      </div>

      <div className="movie-cast-crew__group">
        <h3>Directors</h3>

        <div className="movie-cast-crew__list">
          {renderPeople(movie?.directors, "director")}
        </div>
      </div>

      <div className="movie-cast-crew__group">
        <h3>Writers</h3>

        <div className="movie-cast-crew__list">
          {renderPeople(movie?.writers, "writer")}
        </div>
      </div>
    </section>
  );
};

export default MovieCastCrew;
