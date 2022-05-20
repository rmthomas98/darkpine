import styles from "./Payment.module.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import ButtonLoader from "../../ButtonLoader/ButtonLoader";
import axios from "axios";

const Payment = ({ accountInfo }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    const setupCard = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    // check for payment error
    if (setupCard.error) {
      setIsLoading(false);
    }

    // make backend call to create account for mongodb
    const response = await axios.post("/api/signup/signup", accountInfo);
  };

  return (
    <form>
      <PaymentElement />
      <div className={styles.btnContainer}>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={styles.submitBtn}
        >
          {isLoading ? <ButtonLoader /> : "Pay now"}
        </button>
      </div>
    </form>
  );
};

export default Payment;
