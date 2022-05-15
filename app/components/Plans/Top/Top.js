import styles from "./Top.module.css";

const Top = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>
          Find the plan that&#39;s perfect for you.
        </p>
        <p className={styles.subHeader}>
          Look through different personal and business plan options below.
        </p>
      </div>
    </div>
  );
};

export default Top;
