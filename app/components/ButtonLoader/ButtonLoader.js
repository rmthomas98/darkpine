import styles from "./ButtonLoader.module.css";

const ButtonLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.outerCircle}></div>
      <div className={styles.innerCircle}></div>
      <div className={styles.ball}></div>
    </div>
  );
};

export default ButtonLoader;
