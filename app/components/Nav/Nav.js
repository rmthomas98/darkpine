import styles from "./Nav.module.css";
import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/assets/images/pine-tree.svg';

const Nav = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.title}>
            <Image src={logo} layout="fixed" height={45} width={45}  />
            <span style={{marginLeft: 10}}>Darkpine</span>
            </a>
        </Link>
        <div className={styles.centerLinkContainer}>
          <p className={styles.link}>Product</p>
          <Link href="/"><a className={styles.link}>Pricing</a></Link>
          <p className={styles.link}>Resources</p>
        </div>
        <div className={styles.actionContainer}>
          <Link href="/"><a className={styles.loginBtn}>Log in</a></Link>
          <Link href="/"><a className={styles.signupBtn}>Get started</a></Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
