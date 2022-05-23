import styles from "./PaymentForm.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { useEffect, useState } from "react";
import ButtonLoader from "../../ButtonLoader/ButtonLoader";

const stripeLoader = loadStripe(
  "pk_test_51L17SXCujKXJKQzqV23JMtqjDNpoZ4AgslMllIRIQwzw6BPm2oiiMs6H68n35aVCJu5uZftSXcKm6cg1CEjrIc2C00t9C9jAkW"
);

const PaymentForm = ({ accountInfo }) => {
  const options = {
    clientSecret: accountInfo.clientSecret,
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.title}>Payment Information</p>
        <Elements stripe={stripeLoader} options={options}>
          <Payment accountInfo={accountInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;
