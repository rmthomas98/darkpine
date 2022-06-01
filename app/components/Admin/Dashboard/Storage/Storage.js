import styles from "./Storage.module.css";

const Storage = () => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>Available Storage</p>
			<div className={styles.progressBarContainer}>
				<div className={styles.progressBarFiller}></div>
			</div>
		</div>
	);
};

export default Storage;
