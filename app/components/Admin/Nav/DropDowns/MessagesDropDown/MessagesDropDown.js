import styles from "./MessagesDropDown.module.css";
import Link from "next/link";

const MessagesDropDown = ({ isActive, setIsActive }) => {
  return (
    <div
      className={`${styles.wrapper} ${isActive ? styles.show : styles.hide}`}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          You don&#39;t have any messages at this time.
        </p>
        {/* <div className={styles.btnContainer}>
          <Link href="/admin/messages">
            <a className={styles.viewBtn} onClick={() => setIsActive(false)}>
              View messages
            </a>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default MessagesDropDown;
