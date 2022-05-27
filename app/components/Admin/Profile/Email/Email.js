import { useEffect, useState } from "react";
import styles from "./Email.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Email = ({ user }) => {
  const router = useRouter();

  const [email, setEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!email || email === user.email) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    const loadingToast = toast.loading("Updating email...", {
      style: {
        fontSize: "13px",
        fontWeight: 500,
        background: "#333",
        color: "#fff",
      },
    });

    const response = await axios.post("/api/admin/profile/update-email", {
      email: user.email,
      updatedEmail: email.trim(),
    });

    if (response.data === "success") {
      setIsLoading(false);
      setDisabled(true);
      toast.success("Email updated!", {
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

  return (
    <>
      <Toaster />
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.header}>
          <p className={styles.title}>Your Email</p>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={email ? styles.filled : styles.label}>Email</span>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Update your email.</p>
          <button
            type="submit"
            disabled={isLoading || disabled}
            className={
              isLoading || disabled ? styles.disabled : styles.confirmBtn
            }
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Email;
