import { useState } from "react";
import styles from "./Switcher.module.css";

const Switcher = () => {

  const [plans, setPlans] = useState(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.label} style={{marginRight: 10}}>Individual</p>
        <div className={styles.switch} onClick={() => setPlans(plans == 1 ? 2 : 1)}>
          <div className={`${styles.ball} ${plans === 1 ? styles.toLeft : styles.toRight}`}></div>
        </div>
        <p className={styles.label} style={{marginLeft: 10}}>Business</p>
      </div>
    </div>
  );
};

export default Switcher;
