import styles from "./Storage.module.css";
import { BiCloud, BiData } from "react-icons/bi";
import { useMemo } from "react";

const Storage = () => {
  const radius = 46;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (15 / 100) * circumference;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Available Storage</p>
      <div className={styles.flexContainer}>
        <div className={styles.leftContainer}>
          <p>Used Storage</p>
          <p>1gb / 100gb</p>
        </div>
        <div className={styles.progressRingContainer}>
          <p className={styles.percent}>15%</p>
          <svg className={styles.progressRing} height={120} width={120}>
            <circle
              className={styles.progressRingCircleSkeleton}
              strokeWidth={14}
              stroke="#2299dd25"
              fill="transparent"
              r={46}
              cx={60}
              cy={60}
            />
            <circle
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: offset,
              }}
              className={styles.progressRingCircle}
              strokeWidth={14}
              stroke="#2299dd"
              fill="transparent"
              r={46}
              cy={60}
              cx={60}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Storage;
