import styles from "./Footer.module.css";
import logo from "../../public/assets/images/pine-tree.svg";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineTwitter } from "react-icons/ai";

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
            <Link href="/">
              <a className={styles.link}>Privacy Policy</a>
            </Link>
            <Link href="/">
              <a className={styles.link}>Terms of Service</a>
            </Link>
            <Link href="/">
              <a className={styles.link}>Security Info</a>
            </Link>
          </div>
          <div className={styles.support}>
            <p className={styles.sectionHeader}>Support</p>
            <Link href="/">
              <a className={styles.link}>Contact</a>
            </Link>
          </div>
          <div className={styles.socials}>
            <p className={styles.sectionHeader}>Socials</p>
            <Link href="/">
              <a
                className={styles.link}
                style={{ display: "flex", alignItems: "center" }}
              >
                <AiOutlineTwitter style={{ marginRight: 8 }} size={20} />
                Twitter
              </a>
            </Link>
          </div>
        </div>
        <p className={styles.copyright}>&copy; Darkpine 2022.</p>
      </div>
    </div>
  );
};

export default Footer;
