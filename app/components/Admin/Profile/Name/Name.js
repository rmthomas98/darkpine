import { useEffect, useState } from "react";
import styles from "./Name.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Name = ({ user }) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) return;
    setIsLoading(true);

    const loadingToast = toast.loading("Updating name...", {
      style: {
        fontSize: "13px",
        fontWeight: 500,
        background: "#333",
        color: "#fff",
      },
    });

    const response = await axios.post("/api/admin/profile/update-name", {
      firstName,
      lastName,
      email: user.email,
    });

    if (response.data === "success") {
      setIsLoading(false);
      setDisabled(true);
      toast.success("Name updated!", {
        id: loadingToast,
        style: {
          fontSize: "13px",
          fontWeight: 500,
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#06ce95",
          secondary: "#fff",
        },
      });
      router.replace(router.asPath);
    } else {
      setIsLoading(false);
      setDisabled(true);
      toast.error("An error has occurred.", {
        id: loadingToast,
        style: {
          fontSize: "13px",
          fontWeight: 500,
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#e6375d",
          secondary: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    if (
      (firstName !== user.firstName && firstName && lastName) ||
      (lastName !== user.lastName && lastName && firstName)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName]);

  return (
    <>
      <Toaster />
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.header}>
          <p className={styles.title}>Your name</p>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <span className={firstName ? styles.filled : styles.label}>
              First Name
            </span>
          </div>
          <div className={styles.inputContainer} style={{ marginRight: 0 }}>
            <input
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span className={lastName ? styles.filled : styles.label}>
              Last Name
            </span>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Update your name for billing.</p>
          <button
            disabled={isLoading || disabled}
            className={
              isLoading || disabled ? styles.disabled : styles.confirmBtn
            }
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Name;
