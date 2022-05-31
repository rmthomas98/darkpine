import styles from "./CancelPlanModal.module.css";

const CancelPlanModal = ({
  setCancelPlanModal,
  cancelPlanModal,
  handleUpdateCancelAtPeriodEnd,
  isLoading,
}) => {
  return (
    <div className={cancelPlanModal ? styles.wrapper : styles.hide}>
      <div className={cancelPlanModal ? styles.show : styles.container}>
        <p className={styles.title}>Cancel Subscription</p>
        <p className={styles.description}>
          You are about to cancel your plan. You will be downgraded to the free
          plan at the end of your billing period.
        </p>
        <div className={styles.btnContainer}>
          <button
            className={styles.goBackBtn}
            onClick={() => setCancelPlanModal(false)}
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

export default CancelPlanModal;
