import styles from "./ProfileContainer.module.css";
import Name from "../Name/Name";

const ProfileContainer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Manage Profile</p>
        <Name />
      </div>
    </div>
  );
};

export default ProfileContainer;
