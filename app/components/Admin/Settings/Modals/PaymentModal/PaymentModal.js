import styles from "./PaymentModal.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import PaymentProvider from "./PaymentProvider";
const stripeLoader = loadStripe(
  "pk_test_51L17SXCujKXJKQzqV23JMtqjDNpoZ4AgslMllIRIQwzw6BPm2oiiMs6H68n35aVCJu5uZftSXcKm6cg1CEjrIc2C00t9C9jAkW"
);

const PaymentModal = ({
  customerId,
  setPaymentModal,
  paymentModal,
  selectedPlan,
}) => {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getStripeSetup = async () => {
      const response = await axios.get("/api/admin/settings/setup-intent");
      setClientSecret(response.data.clientSecret);
    };
    getStripeSetup();
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

  if (!clientSecret) return <div></div>;

  return (
    <>
      <div className={paymentModal ? styles.wrapper : styles.hide}>
        <div className={paymentModal ? styles.show : styles.container}>
          <p className={styles.title}>Payment Information</p>
          <div className={styles.description}>
            You are signing up for the{" "}
            {selectedPlan === 2 ? "standard plan" : "premium plan"}. You will be
            charged {selectedPlan === 2 ? "$7.99" : "$12.99"} immediately and
            will continue to be charged{" "}
            {selectedPlan === 2 ? "$7.99" : "$12.99"} on a monthly basis.
          </div>
          <Elements stripe={stripeLoader} options={options}>
            <PaymentProvider
              setPaymentModal={setPaymentModal}
              selectedPlan={selectedPlan}
              customerId={customerId}
            />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
