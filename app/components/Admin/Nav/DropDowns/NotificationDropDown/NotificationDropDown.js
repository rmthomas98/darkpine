import styles from "./NotificationDropDown.module.css";
import Link from "next/link";

const NotificationDropDown = ({ isActive, setIsActive }) => {
  return (
    <div
      className={`${isActive ? styles.show : styles.hide} ${styles.wrapper}`}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          You don&#39;t have any notifications at this time.
        </p>
        {/* <div className={styles.btnContainer}>
          <Link href="/admin/messages">
            <a className={styles.viewBtn} onClick={() => setIsActive(false)}>
              View notifications
            </a>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default NotificationDropDown;
