import styles from "./ProfileContainer.module.css";
import Name from "../Name/Name";

const ProfileContainer = () => {
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <Name />
    </div>
  </div>;
};

export default ProfileContainer;
