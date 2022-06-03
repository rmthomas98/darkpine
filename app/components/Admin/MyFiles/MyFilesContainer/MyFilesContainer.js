import styles from "./MyFilesContainer.module.css";
import Nav from "../Nav/Nav";

const MyFilesContainer = () => {
  return (
    <div className={styles.wrapper}>
      <div clasName={styles.container}>
        <Nav />
      </div>
    </div>
  );
};

export default MyFilesContainer;
