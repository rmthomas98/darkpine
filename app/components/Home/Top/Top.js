import styles from "./Top.module.css";
import Image from "next/image";
import computer from "../../../public/assets/images/computer_cloud.svg";
import Link from "next/link";

const Top = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <p className={styles.subHeader}>Cloud Computing Service</p>
          <p className={styles.header}>
            Access all of your files from any device.
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/">
              <a className={styles.getStartedBtn}>Get started</a>
            </Link>
            <Link href="/">
              <a className={styles.pricingBtn}>View pricing</a>
            </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={computer} height={550} width={550} alt="cloud computer" />
        </div>
      </div>
    </div>
  );
};

export default Top;
