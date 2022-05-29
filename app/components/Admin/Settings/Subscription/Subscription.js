import { useState } from "react";
import styles from "./Subscription.module.css";

const Subscription = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState();

  const SelectedButton = () => {
    return <p className={styles.selectedBtn}>Selected</p>;
  };

  const handlePlanSelect = (num) => {
    setIsDisabled(false);
    setSelectedPlan(num);
  };

  return (
    <>
      <form className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Your Subscription</p>
        </div>
        <div className={styles.mainContainer}></div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Manage subscription.</p>
        </div>
      </form>
    </>
  );
};

export default Subscription;
