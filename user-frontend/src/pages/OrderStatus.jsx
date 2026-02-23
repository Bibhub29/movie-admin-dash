import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import Spinner from '../components/ui/Spinner';
import { getOrderStatus } from '../features/payment/paymentService';

export default function OrderStatus() {
  const { orderId } = useParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadStatus = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getOrderStatus(orderId);
        if (isActive) setStatus(data);
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Unable to fetch order status');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadStatus();

    return () => {
      isActive = false;
    };
  }, [orderId]);

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h1 className="mb-4 text-2xl font-semibold text-white">Order Status</h1>
          {loading ? <Spinner /> : null}
          {!loading && error ? <p className="text-rose-300">{error}</p> : null}
          {!loading && !error && status ? (
            <div className="space-y-1 text-sm text-slate-200">
              <p><strong>Order:</strong> {status.orderId}</p>
              <p><strong>Status:</strong> {status.status}</p>
              <p><strong>Payment:</strong> {status.paymentId || '-'}</p>
              <p><strong>Amount:</strong> Rs. {status.amount}</p>
              <p><strong>Currency:</strong> {status.currency}</p>
              {status.paidAt ? <p><strong>Paid At:</strong> {new Date(status.paidAt).toLocaleString()}</p> : null}
              {status.accessExpiresAt ? <p><strong>Access Expires At:</strong> {new Date(status.accessExpiresAt).toLocaleString()}</p> : null}
            </div>
          ) : null}
        </div>
      </Container>
      <Footer />
    </>
  );
}
