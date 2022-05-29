import { useEffect, useState } from "react";
import styles from "./Subscription.module.css";
import { HiChevronDown } from "react-icons/hi";
import { BsCheckLg } from "react-icons/bs";

const Subscription = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(user.plan);
  const [userPlan, setUserPlan] = useState();

  const [isActive, setIsActive] = useState(false);

  const SelectedButton = () => {
    return <p className={styles.selectedBtn}>Selected</p>;
  };

  useEffect(() => {
    switch (user.plan) {
      case "free":
        setSelectedPlan(1);
        setUserPlan(1);
        break;
      case "standard":
        setSelectedPlan(2);
        setUserPlan(2);
        break;
      case "premium":
        setSelectedPlan(3);
        setUserPlan(3);
    }
  }, []);

  const handlePlanSelect = (num) => {
    setSelectedPlan(num);
    if (userPlan === num) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Your Subscription</p>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <div
              className={styles.input}
              onClick={() => setIsActive(!isActive)}
            >
              {selectedPlan === 1 && (
                <p className={styles.inputText}>Free $0.00 / month</p>
              )}
              {selectedPlan === 2 && (
                <p className={styles.inputText}>Standard $7.99 / month</p>
              )}
              {selectedPlan === 3 && (
                <p className={styles.inputText}>Premium $12.99 / month</p>
              )}
              <HiChevronDown
                style={{
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "300ms",
                }}
              />
            </div>
            <div
              className={styles.dropDownContainer}
              style={{ height: isActive ? 93 : 0, opacity: isActive ? 1 : 0 }}
              onClick={() => setIsActive(false)}
            >
              <div
                className={styles.dropDownSelection}
                onClick={() => handlePlanSelect(1)}
              >
                {selectedPlan === 1 && (
                  <BsCheckLg size={12} style={{ marginRight: 10 }} />
                )}
                <p>Free $0.00 / month</p>
              </div>
              <div
                className={styles.dropDownSelection}
                onClick={() => handlePlanSelect(2)}
              >
                {selectedPlan === 2 && (
                  <BsCheckLg size={12} style={{ marginRight: 10 }} />
                )}
                <p>Standard $7.99 / month</p>
              </div>
              <div
                className={styles.dropDownSelection}
                onClick={() => handlePlanSelect(3)}
              >
                {selectedPlan === 3 && (
                  <BsCheckLg size={12} style={{ marginRight: 10 }} />
                )}
                <p>Premium $12.99 / month</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Manage subscription.</p>
          <div className={styles.buttonContainer}>
            <button className={styles.cancelBtn}>Cancel</button>
            <button
              className={
                isLoading || isDisabled ? styles.disabled : styles.confirmBtn
              }
            >
              Change Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
