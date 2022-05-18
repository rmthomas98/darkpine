import styles from "./Cards.module.css";
import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";

const Business = ({ plans }) => {
  return (
    <div
      className={`${styles.wrapper} ${plans == 2 ? styles.show : styles.hide}`}
    >
      <div className={styles.container}>
        <div className={styles.card} style={{ marginRight: 0 }}>
          <div className={styles.label}>Premium</div>
          <p className={styles.title}>
            $19.99 <span className={styles.time}>/ month</span>
          </p>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Unlimited users
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Unlimited storage
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Unlimited devices
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Share files with anyone
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            TLS/SLS encryption
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Auto Backup
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            File Recovery
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            File Locking
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Pine lock
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Shared Folders
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Shared workspace
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Create a team
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            Assign roles
          </div>
          <div className={styles.buttonContainer}>
            <p className={`${styles.selectPlanBtn} ${styles.comingSoon}`}>
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
