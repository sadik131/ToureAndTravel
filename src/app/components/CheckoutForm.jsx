import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntentAsync, selectClientSecret, selectPaymentStatus } from '@/app/globalRedux/payment/paymentSlice';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ totalPrice, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const clientSecret = useSelector(selectClientSecret);
  const status = useSelector(selectPaymentStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'idle' && totalPrice > 0) {
      dispatch(createPaymentIntentAsync({ amount: totalPrice }));
    }
  }, [dispatch, status, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("first");

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    if (clientSecret) {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment succeeded!');
        onSuccess();
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error('Payment initialization failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className='bg-orange-400 text-white' disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
