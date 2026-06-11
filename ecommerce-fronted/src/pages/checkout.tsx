import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51TTgbO21r71Ls6wCXq2wiZtPUNys8VXF1Bf01TXZS01pD7OeMtWxuhAXv7efJ1Ug6Egdv6Sfb4tJPHYmeVvGUeYo008ltznSPX");

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {};
return (
  <div className="checkout-container">
    <form onSubmit={submitHandler}>
      <PaymentElement/>
      <button>{isProcessing ? "Processing..." : "Pay"}</button>
    </form>
  </div>
);
};

const Checkout = () => {
  return (
    <Elements  options={{
    clientSecret: "pi_3Th8Np21r71Ls6wC0odMwea7_secret_8DCmsIGsJ3C0csYcM87kVp6Mk"
    
    }} 
    stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;