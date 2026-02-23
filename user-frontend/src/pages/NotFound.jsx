import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Container className="py-16 text-center">
        <h1 className="text-5xl font-bold text-white">404</h1>
        <p className="mt-2 text-slate-300">Page not found.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Go Home</Button>
        </Link>
      </Container>
      <Footer />
    </>
  );
}
