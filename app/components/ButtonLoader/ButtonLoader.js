import styles from "./ButtonLoader.module.css";

const ButtonLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ballOne}></div>
      <div className={styles.ballTwo}></div>
      <div className={styles.ballThree}></div>
    </div>
  );
};

export default ButtonLoader;
