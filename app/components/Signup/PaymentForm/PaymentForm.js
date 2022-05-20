import styles from "./PaymentForm.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";

const stripeLoader = loadStripe(
  "pk_test_51L0x4pKaq8wh20bLsDrLTlEk1V7yhcsWIboTG54Yi1QlLU618EOtpUbXIfTgDtH6UVswPiJworIewy5KhQYgQmyu00ddeDz43u"
);

const PaymentForm = ({ accountInfo }) => {
  const options = {
    clientSecret: accountInfo.clientSecret,
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
