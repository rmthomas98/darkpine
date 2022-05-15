import styles from "./Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/images/pine-tree.svg";
import { MdOutlineMenu } from "react-icons/md";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const width = useWindowWidth(60);

  useEffect(() => {
    width >= 785 && setIsActive(false);
  }, [width]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.title}>
            <Image
              src={logo}
              layout="fixed"
              height={45}
              width={45}
              alt="pine tree logo"
            />
            <span style={{ marginLeft: 10 }}>Darkpine</span>
          </a>
        </Link>
        <div className={styles.centerLinkContainer}>
          <p className={styles.link}>Product</p>
          <Link href="/">
            <a className={styles.link}>Pricing</a>
          </Link>
          <p className={styles.link}>Resources</p>
        </div>
        <div className={styles.actionContainer}>
          <Link href="/">
            <a className={styles.loginBtn}>Log in</a>
          </Link>
          <Link href="/">
            <a className={styles.signupBtn}>Get started</a>
          </Link>
        </div>
        <div className={styles.mobileActionContainer}>
          <Link href="/">
            <a className={styles.loginBtnMobile}>Log in</a>
          </Link>
          <div className={styles.burger}>
            <MdOutlineMenu
              onClick={() => setIsActive(true)}
              size={26}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
          <MobileMenu isActive={isActive} setIsActive={setIsActive} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
