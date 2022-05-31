import styles from "./RenewPlanModal.module.css";

const RenewPlanModal = ({
  setRenewPlanModal,
  renewPlanModal,
  handleUpdateCancelAtPeriodEnd,
  isLoading,
}) => {
  return (
    <div className={renewPlanModal ? styles.wrapper : styles.hide}>
      <div className={renewPlanModal ? styles.show : styles.container}>
        <p className={styles.title}>Renew Subscription</p>
        <p className={styles.description}>
          You are about to renew your subscription. You will continue to be
          billed on a monthly basis.
        </p>
        <div className={styles.btnContainer}>
          <button
            className={styles.goBackBtn}
            onClick={() => setRenewPlanModal(false)}
            disabled={isLoading}
          >
            Go back
          </button>
          <button
            className={styles.confirmBtn}
            disabled={isLoading}
            style={{ cursor: isLoading ? "default" : "pointer" }}
            onClick={() => handleUpdateCancelAtPeriodEnd(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewPlanModal;
