import MovieRow from "./MovieRow";
import { movies } from "../../data/movies";

function Home() {
  return (
    <>
      <MovieRow
        title="Top Streaming"
        subtitle="Most rented this week"
        movies={movies}
      />

      <MovieRow
        title="Trending Now"
        subtitle="What everyone's talking about"
        movies={movies}
      />

      <MovieRow
        title="Top Rated"
        subtitle="Critically acclaimed favorites"
        movies={movies}
      />

      <MovieRow
        title="Genre"
        subtitle="Explore stories by genre"
        movies={movies}
      />

      <MovieRow
        title="Recommended For You"
        subtitle="Curated just for your taste"
        movies={movies}
      />

      <MovieRow
        title="Try Something New"
        subtitle="Step outside your comfort zone"
        movies={movies}
      />
    </>
  );
}

export default Home;