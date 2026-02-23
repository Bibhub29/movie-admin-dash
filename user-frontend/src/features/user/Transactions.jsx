import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';

export default function Transactions() {
  return (
    <>
      <Navbar />
      <Container className="py-8">
        <Card>
          <h1 className="mb-2 text-xl font-semibold text-white">Transactions</h1>
          <p className="text-slate-300">Track individual order statuses from purchase confirmations.</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
