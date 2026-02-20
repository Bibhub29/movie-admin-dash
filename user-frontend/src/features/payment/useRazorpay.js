import { createOrder } from './paymentService';

export default function useRazorpay() {
  const openCheckout = async ({ movieId, amount, onSuccess }) => {
    const order = await createOrder(movieId, amount);
    // Replace this simulation with actual Razorpay script integration.
    onSuccess?.({
      razorpay_order_id: order.orderId,
      razorpay_payment_id: 'pay_demo',
      razorpay_signature: 'demo_signature'
    });
  };

  return { openCheckout };
}
