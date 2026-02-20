import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import { getOrderStatus } from '../features/payment/paymentService';

export default function OrderStatus() {
  const { orderId } = useParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getOrderStatus(orderId).then(setStatus);
  }, [orderId]);

  return (
    <>
      <Navbar />
      <Container>
        <div className="my-8 rounded bg-white p-6 shadow">
          <h1 className="mb-4 text-xl font-semibold">Order Status</h1>
          {status ? (
            <div className="space-y-1 text-sm">
              <p><strong>Order ID:</strong> {status.orderId}</p>
              <p><strong>Status:</strong> {status.status}</p>
              <p><strong>Amount:</strong> ₹{status.amount}</p>
              <p><strong>Currency:</strong> {status.currency}</p>
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
