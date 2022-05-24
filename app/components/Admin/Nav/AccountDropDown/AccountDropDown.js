import styles from "./AccountDropDown.module.css";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { HiArrowSmRight } from "react-icons/hi";

const AccountDropDown = ({ isActive }) => {
  return (
    <div
      className={`${styles.wrapper} ${isActive ? styles.show : styles.hide}`}
    >
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.link}>
            <div className={styles.iconContainer}>
              <FaUserCircle size={14} />
            </div>
            <div className={styles.linkContainer}>
              <span className={styles.title}>
                My Profile
                <HiArrowSmRight
                  style={{ marginLeft: 5 }}
                  className={styles.arrow}
                />
              </span>
              <span className={styles.subTitle}>Account Information</span>
            </div>
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            <div
              className={styles.iconContainer}
              style={{ background: "linear-gradient(45deg, #1bf7ff, #e624ff)" }}
            >
              <BsGearFill size={14} />
            </div>
            <div className={styles.linkContainer}>
              <span className={styles.title}>
                Settings
                <HiArrowSmRight
                  style={{ marginLeft: 5 }}
                  className={styles.arrow}
                />
              </span>
              <span className={styles.subTitle}>Manage subscription</span>
            </div>
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            <div
              className={styles.iconContainer}
              style={{
                background: "linear-gradient(45deg, #f83737, #ff49e7)",
              }}
            >
              <BsArrowRightCircleFill size={14} />
            </div>
            <span className={styles.title} style={{ marginBottom: 0 }}>
              Log out{" "}
              <HiArrowSmRight
                style={{ marginLeft: 5 }}
                className={styles.arrow}
              />
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AccountDropDown;
