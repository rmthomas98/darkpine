import styles from './Share.module.css'
import Image from 'next/image'
import sharing from '../../../public/assets/images/share.svg'

const Share = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image src={sharing} height={450} width={450} />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.title}>Share Files</p>
          <p className={styles.description}>Share your files with anyone. You can protect your files with a password to make sure they don&#39;t end up in the wrong hands. You can also send your files to people that aren&#39;t users at Darkpine.</p>
        </div>
      </div>
    </div>
  )
}

export default Share;