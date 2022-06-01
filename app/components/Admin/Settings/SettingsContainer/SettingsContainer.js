import Subscription from "../Subscription/Subscription";
import styles from "./SettingsContainer.module.css";
import PaymentMethod from "../PaymentMethod/PaymentMethod";

const SettingsContainer = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Account Settings</p>
        <Subscription user={user} />
        {user.plan !== "free" && !user.cancelAtPeriodEnd && (
          <PaymentMethod
            card={user.cardDetails}
            paymentStatus={user.paymentStatus}
            customerId={user.customerId}
            currentInvoice={user.currentInvoice}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsContainer;
