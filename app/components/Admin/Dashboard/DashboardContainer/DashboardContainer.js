import styles from "./DashboardContainer.module.css";
import Storage from "../Storage/Storage";

const DashboardContainer = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<p className={styles.header}>Dashboard</p>
				<Storage />
			</div>
		</div>
	);
};

export default DashboardContainer;
