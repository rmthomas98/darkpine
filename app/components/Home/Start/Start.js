import styles from "./Start.module.css";
import Image from "next/image";
import start from "../../../public/assets/images/start.svg";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

const Start = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <p className={styles.header}>Ready to get started?</p>
          <p className={styles.description}>Start storing your files today.</p>
          <div className={styles.buttonContainer}>
            <Link href="/">
              <a className={styles.startNowBtn}>
                Start now free
                <HiArrowSmRight size={20} />
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={start} height={400} width={400} />
        </div>
      </div>
    </div>
  );
};

export default Start;
