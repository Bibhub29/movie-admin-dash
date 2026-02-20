import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Button from '../../components/ui/Button';
import { fetchMovieDetails } from './moviesService';
import PaymentButton from '../payment/PaymentButton';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <>
      <Navbar />
      <Container>
        <div className="my-8 grid gap-6 rounded bg-white p-6 shadow md:grid-cols-2">
          <img src={movie.coverImageUrl} alt={movie.title} className="w-full rounded" />
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p>{movie.description}</p>
            <p className="font-semibold">₹{movie.price}</p>
            <div className="flex gap-3">
              <PaymentButton movieId={movie.id} amount={movie.price} />
              <Button className="bg-slate-700 hover:bg-slate-800">Watch Trailer</Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
