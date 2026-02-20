import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';

export default function Transactions() {
  return (
    <>
      <Navbar />
      <Container>
        <div className="my-8 rounded bg-white p-6 shadow">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <p className="text-slate-600">Use order status endpoint for each payment transaction.</p>
        </div>
      </Container>
      <Footer />
    </>
  );
}
