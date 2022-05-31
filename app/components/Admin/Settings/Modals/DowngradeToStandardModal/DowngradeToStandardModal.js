import styles from "./DowngradeToStandardModal.module.css";

const DowngradeToStandardModal = ({
  setDowngradeToStandardModal,
  downgradeToStandardModal,
  handleDowngradePlan,
  isLoading,
}) => {
  return (
    <div className={downgradeToStandardModal ? styles.wrapper : styles.hide}>
      <div
        className={downgradeToStandardModal ? styles.show : styles.container}
      >
        <p className={styles.title}>Downgrade to Standard</p>
        <p className={styles.description}>
          You are about to downgrade from premium to standard. Your plan will
          change to standard immediately and you will have a $4.99 credit that
          will be used towards your next bill.
        </p>
        <div className={styles.btnContainer}>
          <button
            className={styles.goBackBtn}
            onClick={() => setDowngradeToStandardModal(false)}
            disabled={isLoading}
          >
            Go back
          </button>
          <button
            className={styles.confirmBtn}
            disabled={isLoading}
            style={{ cursor: isLoading ? "default" : "pointer" }}
            onClick={handleDowngradePlan}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DowngradeToStandardModal;
