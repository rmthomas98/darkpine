import styles from './Info.module.css'
import Image from 'next/image'
import addFiles from '../../../public/assets/images/add_files.svg';
import organizeFiles from '../../../public/assets/images/organize_files.svg';
import secureFiles from '../../../public/assets/images/secure_files.svg';

const Info = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Storing your files shouldn&#39;t be a struggle.</p>
        <p className={styles.subHeader}>Save your files to the cloud in seconds.<br></br>Take a look at some of the things you can do with Darkpine.</p>
        <div className={styles.flexContainer}>
          <div className={styles.featureContainer}>
            <Image src={addFiles} height={140} width={140} />
            <p className={styles.title}>Upload Files</p>
            <p className={styles.description}>Keep track of all the files you need. All file types are supported within our cloud storage.</p>
          </div>
          <div className={styles.featureContainer}>
            <Image src={organizeFiles} height={140} width={140} />
            <p className={styles.title}>Stay Organized</p>
            <p className={styles.description}>Keep related files together and locate files quickly through our search tool.</p>
          </div>
          <div className={styles.featureContainer}>
            <Image src={secureFiles} height={140} width={140} />
            <p className={styles.title}>Secure Files</p>
            <p className={styles.description}>Your files will be stored in the private cloud where end-to-end encryption will happen.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info;