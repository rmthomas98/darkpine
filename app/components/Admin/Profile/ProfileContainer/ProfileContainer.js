import styles from "./ProfileContainer.module.css";
import Name from "../Name/Name";
import Email from "../Email/Email";
import Password from "../Password/Password";
import Avatar from "../Avatar/Avatar";

const ProfileContainer = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Manage Profile</p>
        <Avatar user={{ avatar: user.avatar, customerId: user.customerId }} />
        <Name
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            customerId: user.customerId,
          }}
        />
        <Email user={{ email: user.email, customerId: user.customerId }} />
        <Password user={{ customerId: user.customerId }} />
      </div>
    </div>
  );
};

export default ProfileContainer;
