import styles from "./MessagesDropDown.module.css";
import Link from "next/link";
import { useState } from "react";

const MessagesDropDown = ({ isActive }) => {
  return (
    <div
      className={`${styles.wrapper} ${isActive ? styles.show : styles.hide}`}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          You don&#39;t have any messages at this time.
        </p>
        <div className={styles.btnContainer}>
          <Link href="/admin/messages">
            <a className={styles.viewBtn}>View messages</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessagesDropDown;
