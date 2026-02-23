const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
let checkoutLoadPromise;

function loadCheckoutScript() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (checkoutLoadPromise) return checkoutLoadPromise;

  checkoutLoadPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return checkoutLoadPromise;
}

export async function openRazorpayCheckout({ order, onSuccess, onFailure, prefill }) {
  const loaded = await loadCheckoutScript();

  if (!loaded || !window.Razorpay) {
    throw new Error('Unable to load Razorpay checkout script');
  }

  if (!order?.keyId || !order?.orderId || !order?.amount) {
    throw new Error('Invalid payment order details received from server');
  }

  return new Promise((resolve, reject) => {
    const instance = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency || 'INR',
      order_id: order.orderId,
      name: 'MovieVerse',
      description: 'Movie rental payment',
      prefill,
      modal: {
        ondismiss: () => {
          const error = new Error('Payment cancelled by user');
          onFailure?.(error);
          reject(error);
        }
      },
      handler: async (response) => {
        try {
          await onSuccess(response);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
    });

    instance.on('payment.failed', (event) => {
      const error = new Error(event?.error?.description || 'Payment failed');
      onFailure?.(error);
      reject(error);
    });

    instance.open();
  });
}
