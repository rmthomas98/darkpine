import styles from "./DashboardContainer.module.css";
import Storage from "../Storage/Storage";

const DashboardContainer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Nav />
        <div className={styles.topFlexContainer}>
          <Storage />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
