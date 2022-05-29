import Subscription from "../Subscription/Subscription";
import styles from "./SettingsContainer.module.css";

const SettingsContainer = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Account Settings</p>
        <Subscription user={user} />
      </div>
    </div>
  );
};

export default SettingsContainer;
