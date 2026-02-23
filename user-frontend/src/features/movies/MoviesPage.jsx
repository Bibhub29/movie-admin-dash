import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Spinner from '../../components/ui/Spinner';
import Skeleton from '../../components/ui/Skeleton';
import MovieGrid from '../../components/movie/MovieGrid';
import CategoryFilter from '../../components/movie/CategoryFilter';
import { fetchMovies } from './moviesService';
import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export default function MoviesPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const [movieData, categoryData] = await Promise.all([
          fetchMovies({ page, limit: 10 }),
          api.get(API_ENDPOINTS.categories || '/api/categories').then((res) => res?.data?.data || [])
        ]);

        if (!isActive) return;
        setMovies(Array.isArray(movieData?.movies) ? movieData.movies : []);
        setTotalPages(movieData?.totalPages || 1);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (err) {
        if (isActive) {
          setError(err?.response?.data?.message || 'Failed to load movies');
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [page]);

  const filteredMovies = category
    ? movies.filter((movie) => {
        const movieCategoryId = movie?.category?._id || movie?.category?.id;
        return movieCategoryId === category;
      })
    : movies;

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-white">Discover Movies</h1>
          <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-80" />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">{error}</div>
        ) : null}

        {!loading && !error && filteredMovies.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
            No movies found.
          </div>
        ) : null}

        {!loading && !error && filteredMovies.length > 0 ? (
          <MovieGrid movies={filteredMovies} onOpen={(movieId) => navigate(`/movies/${movieId}`)} />
        ) : null}

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-50"
            disabled={page <= 1 || loading}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <span className="text-sm text-slate-300">Page {page} of {totalPages}</span>
          <button
            type="button"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-50"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </button>
        </div>
      </Container>
      <Footer />
    </>
  );
}
