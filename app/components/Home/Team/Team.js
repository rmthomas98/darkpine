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
          <p className={styles.title}>Create a Team</p>
          <p className={styles.description}>
            Collaboration at it&#39;s finest. Create a shared workspace making
            file sharing even easier. See when someone makes change to a file.
            Give certain roles to each person to allow what they can do within
            the organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
