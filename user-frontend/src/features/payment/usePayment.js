import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, verifyOrder } from './paymentService';
import { openRazorpayCheckout } from './razorpay';
import { useToast } from '../../context/ToastContext';

export default function usePayment() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const purchaseMovie = async ({ movieId, prefill }) => {
    if (!movieId || loading) return false;

    setLoading(true);

    try {
      const order = await createOrder(movieId);

      await openRazorpayCheckout({
        order,
        prefill,
        onSuccess: async (response) => {
          const result = await verifyOrder({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          showToast({ type: 'success', title: 'Payment successful', message: 'Movie unlocked in My Movies.' });
          navigate('/my-movies', { state: { payment: result } });
        },
        onFailure: (error) => {
          showToast({ type: 'error', title: 'Payment cancelled', message: error.message });
        }
      });

      return true;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error.message || 'Unable to complete payment';

      if (status === 409) {
        showToast({ type: 'info', title: 'Already rented', message });
        navigate('/my-movies');
      } else if (status === 401) {
        showToast({ type: 'error', title: 'Unauthorized', message: 'Please login again.' });
        navigate('/login');
      } else if (status === 400) {
        showToast({ type: 'error', title: 'Verification failed', message });
      } else {
        showToast({ type: 'error', title: 'Payment failed', message });
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { purchaseMovie, loading };
}
