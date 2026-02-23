import MovieCard from './MovieCard';

export default function MovieGrid({ movies = [], onOpen }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id || movie._id} movie={movie} onOpen={onOpen} />
      ))}
    </div>
  );
}
