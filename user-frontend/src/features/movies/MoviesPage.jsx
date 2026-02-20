import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Spinner from '../../components/ui/Spinner';
import MovieGrid from '../../components/movie/MovieGrid';
import CategoryFilter from '../../components/movie/CategoryFilter';
import { fetchMovies } from './moviesService';
import { getCategories } from '../categories/categoriesService';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchMovies(), getCategories()])
      .then(([movieRes, categoryRes]) => {
        setMovies(movieRes.movies || []);
        setCategories(categoryRes || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = category
    ? movies.filter((movie) => movie.category?._id === category || movie.category?.id === category)
    : movies;

  return (
    <>
      <Navbar />
      <Container>
        <div className="my-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Explore Movies</h1>
          <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        </div>
        {loading ? <Spinner /> : <MovieGrid movies={filtered} />}
      </Container>
      <Footer />
    </>
  );
}
