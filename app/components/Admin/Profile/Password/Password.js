import { useState } from "react";
import styles from "./Password.module.css";

const Password = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Your Password</p>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
            />
            <span className={styles.label}>Password</span>
          </div>
          <div className={styles.inputContainer} style={{ marginRight: 0 }}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
            />
            <span className={styles.label}>Confirm</span>
          </div>
        </div>
        <div className={styles.switchContainer}>
          <div
            className={styles.switch}
            onClick={() => setShowPassword(!showPassword)}
          >
            <div className={showPassword ? styles.right : styles.ball}></div>
          </div>
          <p className={styles.footerText}>Show password</p>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Update your password.</p>
          <button
            className={
              isLoading || isDisabled ? styles.disabled : styles.confirmBtn
            }
            disabled={isLoading || isDisabled}
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Password;
