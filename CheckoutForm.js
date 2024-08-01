import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <div className="checkout-form">
      <div className="product-info">
        <h2>Powdur</h2>
        <p>Subscribe to Starter</p>
        <h3>$12.00 per month</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHomKJqzYQ6QN3Ja9chL6Z8H6oiII3t5tYbw&s" alt="Powdur Product" />
      </div>
      <div className="payment-form">
        <h2>Payment</h2>
        <form onSubmit={handleSubmit}>
          <button type="button" className="apple-pay-button">Apple Pay</button>
          <div className="divider">Or pay with card</div>
          <input type="email" placeholder="Email" required />
          <CardElement />
          <input type="text" placeholder="Name on card" required />
          <input type="text" placeholder="ZIP" required />
          <button type="submit" disabled={!stripe}>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
