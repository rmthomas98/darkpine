import styles from "./Payment.module.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import ButtonLoader from "../../ButtonLoader/ButtonLoader";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const Payment = ({ accountInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // set up toast
  const errorMessage = () =>
    toast.error("Something went wrong.", {
      style: {
        fontSize: "14px",
        fontWeight: 700,
      },
      duration: 5000,
    });

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
      errorMessage()
    }

    // make backend call to create account for mongodb and stripe
    const response = await axios.post("/api/signup/signup", accountInfo);
    if (response.data === 'success') {
      router.push({pathname: '/login', query: 'newAccount'})
    } else {
      setIsLoading(false)
      errorMessage()
    }
  };

  return (
    <>
      <Toaster />
      <form>
        <PaymentElement />
        <div className={styles.btnContainer}>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {!stripe || isLoading ? <ButtonLoader /> : "Pay now"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Payment;
