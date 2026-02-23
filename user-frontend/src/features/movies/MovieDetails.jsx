import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import PaymentButton from '../payment/PaymentButton';
import { fetchMovieDetails } from './moviesService';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadMovie = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMovieDetails(movieId);
        if (isActive) setMovie(data);
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Failed to load movie');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadMovie();
    return () => {
      isActive = false;
    };
  }, [movieId]);

  const resolvedMovieId = useMemo(() => movie?.id || movie?._id || movieId, [movie, movieId]);

  return (
    <>
      <Navbar />
      <Container className="py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : null}

        {!loading && error ? <p className="text-rose-300">{error}</p> : null}

        {!loading && !error && movie ? (
          <div className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-2">
            <img className="h-full w-full rounded-xl object-cover" src={movie.coverImageUrl} alt={movie.title} />
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
              <p className="text-slate-300">{movie.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{`Rs. ${movie.price}`}</Badge>
                <Badge className="bg-amber-500/20 text-amber-200">Rating: {movie.rating || 0}</Badge>
                {movie?.category?.name ? <Badge>{movie.category.name}</Badge> : null}
              </div>
              <PaymentButton movieId={resolvedMovieId} />
            </div>
          </div>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}

