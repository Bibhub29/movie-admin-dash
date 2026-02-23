import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Spinner from '../components/ui/Spinner';
import useStream from '../hooks/useStream';

export default function StreamPlayer() {
  const { movieId } = useParams();
  const { streamUrl, loading, error } = useStream(movieId);

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h1 className="mb-4 text-2xl font-semibold text-white">Watch Movie</h1>
          {loading ? <Spinner /> : null}
          {!loading && error ? <p className="text-rose-300">{error}</p> : null}
          {!loading && !error && streamUrl ? <video controls className="w-full rounded-lg" src={streamUrl} /> : null}
        </div>
      </Container>
      <Footer />
    </>
  );
}
