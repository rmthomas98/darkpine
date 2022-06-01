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

const PaymentProvider = ({
  customerId,
  setIsActive,
  paymentStatus,
  currentInvoice,
}) => {
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

    const setup = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (setup.error) {
      setIsLoading(false);
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }

    // make an endpoint the same as the add-payment-method but with the invoices.pay
    // if payment failed...so we need to attach a new card to the customer and then pay the invoice
    if (paymentStatus === "failed") {
      const response = await axios.post("/api/admin/settings/pay-invoice", {
        customerId,
        currentInvoice,
        paymentMethod: setup.setupIntent.payment_method,
      });

      if (response.data === "success") {
        toast.success("Payment method added!", {
          id: loadingToast,
          style: toastStyle,
          iconTheme: successIconTheme,
        });
        setIsLoading(false);
        router.replace(router.asPath);
        setIsActive(false);
      } else {
        setIsLoading(false);
        toast.error("An error has occured", {
          id: loadingToast,
          style: toastStyle,
          iconTheme: errorIconTheme,
        });
      }
    } else {
      const response = await axios.post(
        "/api/admin/settings/add-payment-method",
        {
          customerId,
          paymentMethod: setup.setupIntent.payment_method,
        }
      );

      if (response.data === "success") {
        toast.success("Payment method added!", {
          id: loadingToast,
          style: toastStyle,
          iconTheme: successIconTheme,
        });
        setIsLoading(false);
        router.replace(router.asPath);
        setIsActive(false);
      } else {
        setIsLoading(false);
        toast.error("An error has occured", {
          id: loadingToast,
          style: toastStyle,
          iconTheme: errorIconTheme,
        });
      }
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
          Confirm
        </button>
        <button
          className={styles.goBackBtn}
          disabled={isLoading}
          onClick={() => setIsActive(false)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default PaymentProvider;
