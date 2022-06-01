import styles from "./PaymentMethodModal.module.css";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentProvider from "./PaymentProvider";

const stripeLoader = loadStripe(
  "pk_test_51L17SXCujKXJKQzqV23JMtqjDNpoZ4AgslMllIRIQwzw6BPm2oiiMs6H68n35aVCJu5uZftSXcKm6cg1CEjrIc2C00t9C9jAkW"
);

const PaymentMethodModal = ({
  isActive,
  customerId,
  setIsActive,
  currentInvoice,
  paymentStatus,
}) => {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.get("/api/admin/settings/setup-intent");
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, []);

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: "flat",
      variables: { fontFamily: '"Gilroy", sans-serif' },
      rules: {
        ".Input": {
          boxShadow: "0px 3px 6px #d3d3d3",
          backgroundColor: "#fff",
          padding: "11px 10px",
          borderRadius: "6px",
          color: "#061621",
          fontWeight: 500,
          fontSize: "12px",
          marginBottom: "5px",
        },
        ".Input:hover": {
          boxShadow: "0px 4px 18px #d3d3d3",
        },
        ".Input:focus": {
          boxShadow: "0px 4px 18px #d3d3d3",
        },
        ".Label": {
          color: "#061621",
          fontWeight: 600,
          fontSize: "12px",
        },
      },
    },
  };

  if (!clientSecret) return;

  return (
    <div className={isActive ? styles.wrapper : styles.hide}>
      <div className={isActive ? styles.show : styles.container}>
        <p className={styles.title}>Payment Information</p>
        <p className={styles.description}>
          This card will be set as your default payment method and will be
          charged monthly.
        </p>
        <Elements stripe={stripeLoader} options={options}>
          <PaymentProvider
            customerId={customerId}
            setIsActive={setIsActive}
            paymentStatus={paymentStatus}
            currentInvoice={currentInvoice}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
