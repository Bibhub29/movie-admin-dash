import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { getMyMovies } from './userService';

export default function MyMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getMyMovies();
        if (isActive) setMovies(data);
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Failed to fetch purchased movies');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadData();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <h1 className="mb-5 text-3xl font-bold text-white">My Movies</h1>

        {loading ? <Spinner /> : null}
        {!loading && error ? <p className="text-rose-300">{error}</p> : null}

        {!loading && !error && movies.length === 0 ? (
          <Card className="text-center text-slate-300">No rented movies found.</Card>
        ) : null}

        {!loading && !error && movies.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <Card key={movie.movieId} className="space-y-3">
                <img src={movie.coverImageUrl} alt={movie.title} className="h-44 w-full rounded-xl object-cover" />
                <h3 className="font-semibold text-white">{movie.title}</h3>
                <p className="text-sm text-slate-300">Expires: {new Date(movie.expiryDate || movie.accessExpiresAt).toLocaleString()}</p>
                <Link className="inline-block rounded-lg bg-red-500/80 px-3 py-2 text-sm text-white" to={`/watch/${movie.movieId}`}>
                  Watch
                </Link>
              </Card>
            ))}
          </div>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}
