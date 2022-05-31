import styles from "./UpgradeToPremiumModal.module.css";

const UpgradeToPremiumModal = ({
  setUpgradeToPremiumModal,
  upgradeToPremiumModal,
  handleUpgradePlan,
  isLoading,
}) => {
  return (
    <div className={upgradeToPremiumModal ? styles.wrapper : styles.hide}>
      <div className={upgradeToPremiumModal ? styles.show : styles.container}>
        <p className={styles.title}>Upgrade to Premium</p>
        <p className={styles.description}>
          You are about to upgrade from standard to premium. Your card on file
          will be charged $5.00 immediately.
        </p>
        <div className={styles.btnContainer}>
          <button
            className={styles.goBackBtn}
            onClick={() => setUpgradeToPremiumModal(false)}
            disabled={isLoading}
          >
            Go back
          </button>
          <button
            className={styles.confirmBtn}
            disabled={isLoading}
            style={{ cursor: isLoading ? "default" : "pointer" }}
            onClick={handleUpgradePlan}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToPremiumModal;
