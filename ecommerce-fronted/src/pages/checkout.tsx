import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51TTgbO21r71Ls6wCXq2wiZtPUNys8VXF1Bf01TXZS01pD7OeMtWxuhAXv7efJ1Ug6Egdv6Sfb4tJPHYmeVvGUeYo008ltznSPX');

const CheckoutForm = () => {
  return (
    <div>
      ssdd
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;