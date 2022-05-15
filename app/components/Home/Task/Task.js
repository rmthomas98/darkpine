import styles from "./Task.module.css";
import Image from "next/image";
import tasks from "../../../public/assets/images/task.svg";

const Task = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <p className={styles.title}>Assign Tasks</p>
          <p className={styles.description}>
            Create tasks for things you want to get done. You will also have the
            ability of assigning people within your organization to each task
            you make. Get notified when tasks get submitted for approval by the
            team leaders.
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
