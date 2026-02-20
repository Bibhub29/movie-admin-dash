import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import useRazorpay from './useRazorpay';
import { verifyOrder } from './paymentService';

export default function PaymentButton({ movieId, amount }) {
  const { openCheckout } = useRazorpay();
  const navigate = useNavigate();

  const handlePurchase = async () => {
    await openCheckout({
      movieId,
      amount,
      onSuccess: async (payload) => {
        const res = await verifyOrder(payload);
        navigate(`/order-status/${payload.razorpay_order_id}`, { state: { result: res } });
      }
    });
  };

  return <Button onClick={handlePurchase}>Rent Now</Button>;
}
