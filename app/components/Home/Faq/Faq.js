import styles from "./Faq.module.css";
import { useState } from "react";

const Faq = () => {
  const [num, setNum] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Take a look into our faq.</p>
        {/* <div
          className={styles.questionContainer}
          style={{
            borderTop: "1px solid #b5c0be",
            maxHeight: num === 6 ? 200 : 75,
          }}
          onClick={() => (num === 6 ? setNum(0) : setNum(6))}
        >
          <div className={styles.question}>
            <p className={styles.questionP}>What is Darkpine?</p>
            <div className={styles.boxContainer}>
              <div
                className={`${styles.vertical} ${
                  num === 6 ? styles.spin : styles.undoSpin
                }`}
              ></div>
              <span className={styles.horizontal}></span>
            </div>
          </div>
          <p
            className={`${styles.answer} ${
              num === 6 ? styles.appear : styles.dissapear
            }`}
          >
            Darkpine is a cloud storage service that allows you to access all of
            your files on any device. Collab, share, assign tasks, create a
            team, and so much more with the power of Darkpine.
          </p>
        </div> */}
        <div
          className={styles.questionContainer}
          style={{
            borderTop: "1px solid #b5c0be",
            height: num === 1 ? 116 : 75,
          }}
          onClick={() => (num === 1 ? setNum(0) : setNum(1))}
        >
          <div className={styles.question}>
            <p className={styles.questionP}>
              What types of files are supported?
            </p>
            <div className={styles.boxContainer}>
              <div
                className={`${styles.vertical} ${
                  num === 1 ? styles.spin : styles.undoSpin
                }`}
              ></div>
              <span className={styles.horizontal}></span>
            </div>
          </div>
          <p
            className={`${styles.answer} ${
              num === 1 ? styles.appear : styles.dissapear
            }`}
          >
            All file types are supported.
          </p>
        </div>
        <div
          className={styles.questionContainer}
          style={{
            height: num === 2 ? 116 : 75,
          }}
          onClick={() => (num === 2 ? setNum(0) : setNum(2))}
        >
          <div className={styles.question}>
            <p className={styles.questionP}>
              How much free storage do we offer?
            </p>
            <div className={styles.boxContainer}>
              <div
                className={`${styles.vertical} ${
                  num === 2 ? styles.spin : styles.undoSpin
                }`}
              ></div>
              <span className={styles.horizontal}></span>
            </div>
          </div>
          <p
            className={`${styles.answer} ${
              num === 2 ? styles.appear : styles.dissapear
            }`}
          >
            We offer up to 4GB for free for individual use.
          </p>
        </div>
        <div
          className={styles.questionContainer}
          style={{
            height: num === 3 ? 116 : 75,
          }}
          onClick={() => (num === 3 ? setNum(0) : setNum(3))}
        >
          <div className={styles.question}>
            <p className={styles.questionP}>How much storage do we offer?</p>
            <div className={styles.boxContainer}>
              <div
                className={`${styles.vertical} ${
                  num === 3 ? styles.spin : styles.undoSpin
                }`}
              ></div>
              <span className={styles.horizontal}></span>
            </div>
          </div>
          <p
            className={`${styles.answer} ${
              num === 3 ? styles.appear : styles.dissapear
            }`}
          >
            Unlimited storage.
          </p>
        </div>
        <div
          className={styles.questionContainer}
          style={{
            height: num === 4 ? 116 : 75,
          }}
          onClick={() => (num === 4 ? setNum(0) : setNum(4))}
        >
          <div className={styles.question}>
            <p className={styles.questionP}>Is my data encrypted?</p>
            <div className={styles.boxContainer}>
              <div
                className={`${styles.vertical} ${
                  num === 4 ? styles.spin : styles.undoSpin
                }`}
              ></div>
              <span className={styles.horizontal}></span>
            </div>
          </div>
          <p
            className={`${styles.answer} ${
              num === 4 ? styles.appear : styles.dissapear
            }`}
          >
            Data has end-to-end encryption using TLS.
          </p>
        </div>
        <div
          className={styles.questionContainer}
          style={{
            height: num === 5 ? 116 : 75,
          }}
          onClick={() => (num === 5 ? setNum(0) : setNum(5))}
        >
          <div className={styles.question}>
            <p className={styles.questionP}>Who can I share my files with?</p>
            <div className={styles.boxContainer}>
              <div
                className={`${styles.vertical} ${
                  num === 5 ? styles.spin : styles.undoSpin
                }`}
              ></div>
              <span className={styles.horizontal}></span>
            </div>
          </div>
          <p
            className={`${styles.answer} ${
              num === 5 ? styles.appear : styles.dissapear
            }`}
          >
            You can share your files with anyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
