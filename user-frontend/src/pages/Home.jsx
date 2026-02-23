import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="py-10">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-black/60 to-red-950/40 p-8 shadow-2xl md:p-12">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-300">Movie Rental Platform</p>
          <h1 className="max-w-3xl text-4xl font-bold text-white md:text-5xl">Rent blockbusters instantly and stream with verified access.</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Professional user and admin dashboards with secure auth, Razorpay checkout, and protected playback.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/movies"><Button>Browse Movies</Button></Link>
            <Link to="/login"><Button variant="secondary">User Login</Button></Link>
            <Link to="/admin/login"><Button variant="secondary">Admin Login</Button></Link>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
