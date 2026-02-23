import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import usePayment from './usePayment';
import useAuth from '../../hooks/useAuth';

export default function PaymentButton({ movieId }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { purchaseMovie, loading } = usePayment();

  const handlePay = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/movies/${movieId}` } });
      return;
    }

    await purchaseMovie({
      movieId,
      prefill: {
        name: user?.name,
        email: user?.email
      }
    });
  };

  return (
    <Button onClick={handlePay} disabled={loading || !movieId}>
      {loading ? 'Processing...' : 'Rent Now'}
    </Button>
  );
}
