import styles from "./SideNav.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assets/images/pine-tree.svg";
import { useRouter } from "next/router";
import {
  MdAutoFixHigh,
  MdDashboard,
  MdFolder,
  MdPeopleAlt,
  MdSend,
  MdShield,
} from "react-icons/md";
import {
  BsBellFill,
  BsEnvelopeFill,
  BsFillPersonCheckFill,
} from "react-icons/bs";
import {
  BiCategory,
  BiFolder,
  BiShareAlt,
  BiShield,
  BiTrashAlt,
  BiBell,
  BiChat,
  BiUserCheck,
  BiCollection,
  BiBookmark,
} from "react-icons/bi";

const SideNav = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/admin">
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
        <p className={styles.subTitle}>MAIN</p>
        {/* <div className={styles.linkContainer}>
          <Link href="/admin">
            <a
              className={
                router.pathname.endsWith("/admin")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiCategory style={{ marginRight: 8 }} size={18} />
              Dashboard
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/admin") ? styles.filled : styles.bar
            }
          ></div>
        </div> */}
        <div className={styles.linkContainer}>
          <Link href="/admin">
            <a
              className={
                router.pathname.endsWith("/admin")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiFolder style={{ marginRight: 8 }} size={18} />
              My files
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/admin") ? styles.filled : styles.bar
            }
          ></div>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/admin/bookmarked-files">
            <a
              className={
                router.pathname.endsWith("/bookmarked-files")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiBookmark style={{ marginRight: 8 }} size={18} />
              Bookmarked Files
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/bookmarked-files")
                ? styles.filled
                : styles.bar
            }
          ></div>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/admin/shared-files">
            <a
              className={
                router.pathname.endsWith("/shared-files")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiShareAlt style={{ marginRight: 8 }} size={18} />
              Shared files
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/shared-files")
                ? styles.filled
                : styles.bar
            }
          ></div>
        </div>
        {/* <div className={styles.linkContainer}>
          <Link href="/admin/shared-with-me">
            <a
              className={
                router.pathname.endsWith("/shared-with-me")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <MdSend style={{ marginRight: 8 }} size={18} />
              Files shared with me
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/shared-with-me")
                ? styles.filled
                : styles.bar
            }
          ></div>
        </div>*/}
        <div className={styles.linkContainer}>
          <Link href="/admin/pine-lock">
            <a
              className={
                router.pathname.endsWith("/pine-lock")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiShield style={{ marginRight: 8 }} size={18} />
              Pine guard
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/pine-lock")
                ? styles.filled
                : styles.bar
            }
          ></div>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/admin/file-recovery">
            <a
              className={
                router.pathname.endsWith("/file-recovery")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiTrashAlt style={{ marginRight: 8 }} size={18} />
              File recovery
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/file-recovery")
                ? styles.filled
                : styles.bar
            }
          ></div>
        </div>
        <p className={styles.subTitle} style={{ marginTop: 25 }}>
          MANAGMENT
        </p>
        <div className={styles.linkContainer}>
          <Link href="/admin/notes">
            <a
              className={
                router.pathname.endsWith("/notes")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiCollection style={{ marginRight: 8 }} size={18} />
              Notes
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/notes") ? styles.filled : styles.bar
            }
          ></div>
        </div>
        <p className={styles.subTitle} style={{ marginTop: 25 }}>
          ACCOUNT
        </p>
        <div className={styles.linkContainer}>
          <Link href="/admin/notifications">
            <a
              className={
                router.pathname.endsWith("/notifications")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiBell style={{ marginRight: 8 }} size={18} />
              Notifications
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/notifications")
                ? styles.filled
                : styles.bar
            }
          ></div>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/admin/messages">
            <a
              className={
                router.pathname.endsWith("/messages")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiChat style={{ marginRight: 8 }} size={18} />
              Messages
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/messages") ? styles.filled : styles.bar
            }
          ></div>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/admin/friends">
            <a
              className={
                router.pathname.endsWith("/friends")
                  ? styles.selectedLink
                  : styles.link
              }
            >
              <BiUserCheck style={{ marginRight: 8 }} size={18} />
              My Friends
            </a>
          </Link>
          <div
            className={
              router.pathname.endsWith("/friends") ? styles.filled : styles.bar
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
