import styles from "./Task.module.css";
import Image from "next/image";
import tasks from "../../../public/assets/images/task.svg";

const Task = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <p className={styles.title}>Pine Lock</p>
          <p className={styles.description}>
            Pine lock is a special feature that allows you to store your most important files in a special place within the app that is protected by any password that you want.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image src={tasks} height={450} width={450} alt="create tasks" />
        </div>
      </div>
    </div>
  );
};

export default Task;
