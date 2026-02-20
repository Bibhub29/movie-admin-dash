import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import { getMyMovies } from './userService';
import { calculateExpiry } from '../../utils/calculateExpiry';

export default function MyMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMyMovies().then(setMovies);
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <Card key={movie.movieId} className="space-y-2">
              <img src={movie.coverImageUrl} alt={movie.title} className="h-40 w-full rounded object-cover" />
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-slate-600">{calculateExpiry(movie.expiryDate)}</p>
              <Link className="text-blue-600" to={`/watch/${movie.movieId}`}>Watch now</Link>
            </Card>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}
