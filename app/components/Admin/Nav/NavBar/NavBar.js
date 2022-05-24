import styles from "./NavBar.module.css";
import { FiSearch } from "react-icons/fi";
import { BsBellFill, BsEnvelopeFill } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";
import { useState } from "react";
import AccountDropDown from "../AccountDropDown/AccountDropDown";
import avatar from "../../../../public/assets/images/avatar.svg";
import Image from "next/image";

const NavBar = () => {
  const [accountMenu, setAccountMenu] = useState(false);
  const [notifsMenu, setNotifsMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input type="text" className={styles.input} />
          <span className={styles.label}>Search files...</span>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.search} />
          </div>
        </div>
        <div className={styles.navContainer}>
          <div className={styles.messageContainer}>
            <div className={styles.expanse}></div>
            <BsEnvelopeFill className={styles.message} />
          </div>
          <div className={styles.bellContainer}>
            <div className={styles.expanse}></div>
            <BsBellFill className={styles.bell} />
          </div>
          <div
            className={styles.profileContainer}
            onMouseEnter={() => setAccountMenu(true)}
            onMouseLeave={() => setAccountMenu(false)}
          >
            <div className={styles.expanse}></div>
            <div className={styles.avatarContainer}>
              <Image src={avatar} layout="fixed" height={30} width={30} />
            </div>
            <p className={styles.myAccount}>
              Account
              <HiChevronDown style={{ marginLeft: 2 }} />
            </p>
            <AccountDropDown isActive={accountMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
