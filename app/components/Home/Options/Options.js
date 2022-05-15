import styles from "./Options.module.css";
import Image from "next/image";
import individual from "../../../public/assets/images/individual.svg";
import work from "../../../public/assets/images/work.svg";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

const Options = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>How can Darkpine be used?</p>
        <div className={styles.flexContainer}>
          <div className={styles.optionContainer}>
            <div className={styles.imageContainer}>
              <Image
                src={individual}
                height={350}
                width={350}
                alt="personal use"
              />
            </div>
            <p className={styles.title}>Individual Use</p>
            <p className={styles.description}>
              Store whatever is important to you in the cloud. Locate all of
              your files quickly and easily and share your files with whoever
              you may need to.
            </p>
            <div className={styles.buttonContainer}>
              <Link href="/">
                <a className={styles.button}>
                  View individual plans
                  <HiArrowSmRight size={20} />
                </a>
              </Link>
            </div>
          </div>
          <div
            className={styles.optionContainer}
            style={{ marginRight: 0, marginBottom: 0 }}
          >
            <div className={styles.imageContainer}>
              <Image src={work} height={350} width={350} alt="work use" />
            </div>
            <p className={styles.title}>Business Use</p>
            <p className={styles.description}>
              Collaborate with your team, sync all of your data into one shared
              workspace, and become more efficient than ever as a company.
            </p>
            <div className={styles.buttonContainer}>
              <Link href="/">
                <a className={styles.button}>
                  View business plans <HiArrowSmRight size={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
