import styles from "./Cards.module.css";
import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";

const Individual = ({ plans }) => {
  return (
    <div
      className={`${styles.wrapper} ${plans == 1 ? styles.show : styles.hide}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.label}>Free</div>
          <p className={styles.title}>
            $0.00 <span className={styles.time}>/ month</span>
          </p>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" /> 1
            user
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            15 GB storage
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
          <div className={styles.buttonContainer}>
            <Link href="/signup">
              <a className={styles.selectPlanBtn}>Select Plan</a>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Standard</div>
          <p className={styles.title}>
            $8.99 <span className={styles.time}>/ month</span>
          </p>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" /> 1
            user
          </div>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" />{" "}
            3,000 GB storage
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
          <div className={styles.buttonContainer}>
            <Link href="/signup">
              <a className={styles.selectPlanBtn}>Select Plan</a>
            </Link>
          </div>
        </div>
        <div className={styles.card} style={{ marginRight: 0 }}>
          <div className={styles.label}>Premium</div>
          <p className={styles.title}>
            $14.99 <span className={styles.time}>/ month</span>
          </p>
          <div className={styles.feature}>
            <BsCheckLg size={12} style={{ marginRight: 8 }} color="#06ce95" /> 5
            users
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
          <div className={styles.buttonContainer}>
            <Link href="/signup">
              <a className={styles.selectPlanBtn}>Select Plan</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
