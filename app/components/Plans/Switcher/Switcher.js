import styles from "./Switcher.module.css";

const Switcher = ({ plans, setPlans }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p
          className={plans === 1 ? styles.glow : styles.label}
          style={{ marginRight: 10 }}
        >
          Individual
        </p>
        <div
          className={styles.switch}
          onClick={() => setPlans(plans == 1 ? 2 : 1)}
        >
          <div
            className={`${styles.ball} ${
              plans === 1 ? styles.toLeft : styles.toRight
            }`}
          ></div>
        </div>
        <p
          className={plans === 2 ? styles.glow : styles.label}
          style={{ marginLeft: 10 }}
        >
          Business
        </p>
      </div>
    </div>
  );
};

export default Switcher;
