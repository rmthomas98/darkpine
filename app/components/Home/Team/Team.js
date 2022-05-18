import styles from "./Team.module.css";
import Image from "next/image";
import TeamPicture from "../../../public/assets/images/team.svg";

const Team = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image src={TeamPicture} height={450} width={450} alt="create team" />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.title}>Unlimited Device Access</p>
          <p className={styles.description}>
            You won&#39; be limited to only accessing your files on a single device. Access your files on any device from anywhere in the world, at anytime you want.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
