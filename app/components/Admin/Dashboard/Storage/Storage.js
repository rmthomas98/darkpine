import styles from "./Storage.module.css";
import { BiData } from "react-icons/bi";

const Storage = () => {
  const radius = 40;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (15 / 100) * circumference;

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <BiData style={{ marginRight: 5 }} size={20} />
        Storage
      </p>
      <div className={styles.flexContainer}>
        <div className={styles.leftContainer}>
          <p className={styles.remainingText}>Used space</p>
          <p className={styles.sizeText} style={{ marginBottom: 15 }}>
            15 GB / 200 GB
          </p>
        </div>
        <div className={styles.progressRingContainer}>
          <p className={styles.percent}>15%</p>
          <svg className={styles.progressRing} height={100} width={100}>
            <circle
              className={styles.progressRingCircleSkeleton}
              strokeWidth={10}
              stroke="#2299dd25"
              fill="transparent"
              r={40}
              cx={50}
              cy={50}
            />
            <circle
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: offset,
              }}
              className={styles.progressRingCircle}
              strokeWidth={10}
              stroke="#2299dd"
              fill="transparent"
              r={40}
              cy={50}
              cx={50}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Storage;
