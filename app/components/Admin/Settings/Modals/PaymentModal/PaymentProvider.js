import styles from "./PaymentProvider.module.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

// toast style
const toastStyle = {
  fontSize: "13px",
  fontWeight: 500,
  background: "#333",
  color: "#fff",
};

// toast success styles
const successIconTheme = {
  primary: "#06ce95",
  secondary: "#fff",
};

// toast error style
const errorIconTheme = {
  primary: "#e6375d",
  secondary: "#fff",
};

const PaymentProvider = ({ customerId, setPaymentModal, selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setIsLoading(true);

    const loadingToast = toast.loading("Loading...", {
      style: toastStyle,
    });

    const setupCard = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    // check for payment error
    if (setupCard.error) {
      setIsLoading(false);
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }

    const response = await axios.post(
      "/api/admin/settings/create-subscription",
      {
        customerId,
        selectedPlan,
        paymentMethod: setupCard.setupIntent.payment_method,
      }
    );

    if (response.data === "success") {
      toast.success("Payment Succeeded!", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: successIconTheme,
      });
      setIsLoading(false);
      router.replace(router.asPath);
      setPaymentModal(false);
    } else {
      setIsLoading(false);
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  return (
    <div className={styles.container}>
      <PaymentElement />
      <div className={styles.btnContainer}>
        <button
          className={styles.confirmBtn}
          disabled={isLoading || !stripe}
          onClick={handleSubmit}
        >
          Pay now
        </button>
        <button
          className={styles.goBackBtn}
          disabled={isLoading}
          onClick={() => setPaymentModal(false)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default PaymentProvider;
