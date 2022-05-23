import { useEffect, useState } from "react";
import styles from "./Walkthrough.module.css";

const Walkthrough = ({ accountInfo, step }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {step === 1 && (
          <>
            <p className={styles.title}>Get Started With Darkpine</p>
            <p className={styles.description}>
              Start storing your files in the cloud today. No more worrying
              about accessing your files on different devices.
            </p>
          </>
        )}
        {accountInfo?.plan === 2 && step === 2 && (
          <>
            <p className={styles.title}>Standard Plan</p>
            <p className={styles.description}>
              Your card will be charged $7.99 immediately and will continue to
              be charged monthly.
            </p>
          </>
        )}
        {accountInfo?.plan === 3 && step === 2 && (
          <>
            <p className={styles.title}>Premium Plan</p>
            <p className={styles.description}>
              Your card will be charged $12.99 immediately and will continue to
              be charged monthly.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Walkthrough;
