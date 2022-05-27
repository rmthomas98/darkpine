import styles from "./ProfileContainer.module.css";
import Name from "../Name/Name";

const ProfileContainer = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Manage Profile</p>
        <Name
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }}
        />
      </div>
    </div>
  );
};

export default ProfileContainer;
