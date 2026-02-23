import { createOrder } from './paymentService';
import { openRazorpayCheckout } from './razorpay';

export default function useRazorpay() {
  const openCheckout = async ({ movieId, amount, onSuccess }) => {
    const order = await createOrder(movieId, amount);
    return openRazorpayCheckout({ order, onSuccess });
  };

  return { openCheckout };
}
