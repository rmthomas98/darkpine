import styles from './Walkthrough.module.css'

const Walkthrough = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.title}>Get Started With Darkpine</p>
        <p className={styles.description}>Start storing your files in the cloud today. No more worrying about accessing your files on different devices.</p>
      </div>
    </div>
  )
}

export default Walkthrough;