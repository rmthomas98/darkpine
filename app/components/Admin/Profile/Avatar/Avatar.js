import { useState } from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      <form className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Your Avatar</p>
        </div>
        <div className={styles.mainContainer}>
          <input type="file" />
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Update your avatar.</p>
          <button
            className={
              isLoading || isDisabled ? styles.disabled : styles.confirmBtn
            }
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Avatar;
