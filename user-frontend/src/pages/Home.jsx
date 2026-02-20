import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <section className="my-12 rounded-2xl bg-slate-900 p-10 text-white">
          <h1 className="text-4xl font-bold">Movie Rental User Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Browse movies, rent instantly with Razorpay, and stream content with active access using your backend APIs.</p>
          <Link to="/movies" className="mt-6 inline-block"><Button>Browse Movies</Button></Link>
        </section>
      </Container>
      <Footer />
    </>
  );
}
