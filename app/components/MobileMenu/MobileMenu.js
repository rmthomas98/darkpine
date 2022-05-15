import styles from "./MobileMenu.module.css";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

const MobileMenu = ({ isActive, setIsActive }) => {
  return (
    <>
      <div
        className={styles.overlay}
        style={{ display: isActive ? "block" : "none" }}
        onClick={() => setIsActive(false)}
      ></div>
      <div className={styles.container} style={{ width: isActive ? 270 : 0 }}>
        <div className={styles.exitContainer}>
          <IoMdClose
            size={26}
            style={{ cursor: "pointer" }}
            onClick={() => setIsActive(false)}
          />
        </div>
        <Link href="/">
          <a className={styles.link} style={{ borderTop: "1px solid #b5c0be" }}>
            Home
            <HiArrowSmRight className={styles.arrow} size={20} />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            Product
            <HiArrowSmRight className={styles.arrow} size={20} />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            Pricing
            <HiArrowSmRight className={styles.arrow} size={20} />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            Resources
            <HiArrowSmRight className={styles.arrow} size={20} />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            Log in
            <HiArrowSmRight className={styles.arrow} size={20} />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.link}>
            Get started
            <HiArrowSmRight className={styles.arrow} size={20} />
          </a>
        </Link>
      </div>
    </>
  );
};

export default MobileMenu;
