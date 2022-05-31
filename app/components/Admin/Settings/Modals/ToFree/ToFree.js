import styles from "./ToFree.module.css";

const ToFree = ({
  setToFreeModal,
  toFreeModal,
  handleUpdateCancelAtPeriodEnd,
  isLoading,
}) => {
  return (
    <div className={toFreeModal ? styles.wrapper : styles.hide}>
      <div className={toFreeModal ? styles.show : styles.container}>
        <p className={styles.title}>Downgrade To Free</p>
        <p className={styles.description}>
          You are about to downgrade your subscription to the free plan. You
          will keep your current plan until the next billing period.
        </p>
        <div className={styles.btnContainer}>
          <button
            className={styles.goBackBtn}
            onClick={() => setToFreeModal(false)}
            disabled={isLoading}
          >
            Go back
          </button>
          <button
            className={styles.confirmBtn}
            disabled={isLoading}
            style={{ cursor: isLoading ? "default" : "pointer" }}
            onClick={() => handleUpdateCancelAtPeriodEnd(true)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToFree;
