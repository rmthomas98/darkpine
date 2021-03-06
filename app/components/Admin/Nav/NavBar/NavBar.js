import styles from "./NavBar.module.css";
import { FiSearch } from "react-icons/fi";
import { BiBell, BiChat } from "react-icons/bi";
import { HiChevronDown } from "react-icons/hi";
import { useEffect, useState } from "react";
import AccountDropDown from "../DropDowns/AccountDropDown/AccountDropDown";
import defaultAvatar from "../../../../public/assets/images/avatar.svg";
import Image from "next/image";
import NotificationDropDown from "../DropDowns/NotificationDropDown/NotificationDropDown";
import MessagesDropDown from "../DropDowns/MessagesDropDown/MessagesDropDown";
import axios from "axios";
import Link from "next/link";

const NavBar = () => {
  const [accountMenu, setAccountMenu] = useState(false);
  const [notifsMenu, setNotifsMenu] = useState(false);
  const [messageMenu, setMessageMenu] = useState(false);

  const [search, setSearch] = useState("");
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const getAvatar = async () => {
      const response = await axios.get("/api/admin/nav/get-user");
      setAvatar(response.data.avatar);
    };
    getAvatar();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className={search ? styles.filled : styles.label}>
            Search files...
          </span>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.search} />
          </div>
        </div>
        <div className={styles.navContainer}>
          <Link href="/admin/messages">
            <a style={{ cursor: "default" }}>
              <div
                className={styles.messageContainer}
                onMouseEnter={() => setMessageMenu(true)}
                onMouseLeave={() => setMessageMenu(false)}
              >
                <div className={styles.expanse}></div>
                <BiChat className={styles.message} color="#000" />
                <MessagesDropDown
                  isActive={messageMenu}
                  setIsActive={setMessageMenu}
                />
              </div>
            </a>
          </Link>
          <Link href="/admin/notifications">
            <a style={{ cursor: "default" }}>
              <div
                className={styles.bellContainer}
                onMouseEnter={() => setNotifsMenu(true)}
                onMouseLeave={() => setNotifsMenu(false)}
              >
                <div className={styles.expanse}></div>
                <BiBell className={styles.bell} color="#000" />
                <NotificationDropDown
                  isActive={notifsMenu}
                  setIsActive={setNotifsMenu}
                />
              </div>
            </a>
          </Link>
          <div
            className={styles.profileContainer}
            onMouseEnter={() => setAccountMenu(true)}
            onMouseLeave={() => setAccountMenu(false)}
          >
            <div className={styles.expanse}></div>
            <div className={styles.avatarContainer}>
              <Image
                src={avatar ? avatar : defaultAvatar}
                layout="fixed"
                objectFit="cover"
                objectPosition="center"
                height={30}
                width={30}
                quality={100}
              />
            </div>
            <p className={styles.myAccount}>
              Account
              <HiChevronDown style={{ marginLeft: 2 }} />
            </p>
            <AccountDropDown
              isActive={accountMenu}
              setIsActive={setAccountMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
