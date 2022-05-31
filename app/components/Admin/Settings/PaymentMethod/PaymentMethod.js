import { useEffect, useState } from "react";
import styles from "./PaymentMethod.module.css";
import PaymentMethodModal from "../Modals/PaymentMethodModal/PaymentMethodModal";
import { Toaster } from "react-hot-toast";

const PaymentMethod = ({
  card,
  paymentStatus,
  cancelAtPeriodEnd,
  customerId,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Your Payment Method</p>
        </div>
        <div className={styles.mainContainer}>
          {paymentStatus === "failed" && (
            <div className={styles.noteContainer}>
              Payment has failed. Please update payment method.
            </div>
          )}
          <div className={styles.tableHeader}>
            <p className={styles.tableHeaderTitle}>Brand</p>
            <p className={styles.tableHeaderTitle}>Exp</p>
            <p className={styles.tableHeaderTitle}>Last 4</p>
          </div>
          <div className={styles.cardContainer}>
            <p className={styles.cardText}>{card.brand}</p>
            <p className={styles.cardText}>
              {card.exp_month}/{card.exp_year}
            </p>
            <p className={styles.cardText}>{card.last4}</p>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Update payment method.</p>
          <button
            className={styles.confirmBtn}
            disabled={cancelAtPeriodEnd}
            onClick={() => setIsActive(true)}
          >
            Update
          </button>
        </div>
      </div>
      <PaymentMethodModal
        isActive={isActive}
        setIsActive={setIsActive}
        customerId={customerId}
      />
      <Toaster />
    </>
  );
};

export default PaymentMethod;
