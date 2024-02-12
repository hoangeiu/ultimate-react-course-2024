import WatchedMovies from "./WatchedMovies";

export default function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
