import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import { getMovieStream } from '../hooks/useStream';

export default function StreamPlayer() {
  const { movieId } = useParams();
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    getMovieStream(movieId).then((data) => setStreamUrl(data.hlsPlaylistUrl));
  }, [movieId]);

  return (
    <>
      <Navbar />
      <Container>
        <div className="my-8 rounded bg-white p-6 shadow">
          <h1 className="mb-4 text-xl font-semibold">Stream Player</h1>
          {streamUrl ? (
            <video controls className="w-full" src={streamUrl} />
          ) : (
            <p>Loading stream...</p>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
