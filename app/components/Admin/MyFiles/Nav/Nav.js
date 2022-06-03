import styles from "./Nav.module.css";
import { BiCloudUpload } from "react-icons/bi";

const Nav = () => {
  return (
    <div className={styles.container}>
      <p className={styles.header}>My Files</p>
      <button className={styles.uploadFileBtn}>
        <BiCloudUpload style={{ marginRight: 5 }} size={16} />
        Upload file
      </button>
    </div>
  );
};

export default Nav;
