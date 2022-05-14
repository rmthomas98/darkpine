import styles from "./Footer.module.css";
import logo from "../../public/assets/images/pine-tree.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.title}>
            <Image src={logo} layout="fixed" height={45} width={45} />
            <p style={{ marginLeft: 10 }}>Darkpine</p>
          </div>
          <div className={styles.about}>
            <p className={styles.sectionHeader}>About</p>
          </div>
          <div className={styles.support}>
            <p className={styles.sectionHeader}>Support</p>
          </div>
          <div className={styles.socials}>
            <p className={styles.sectionHeader}>Socials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
