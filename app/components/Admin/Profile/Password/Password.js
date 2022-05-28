import { useEffect, useState } from "react";
import styles from "./Password.module.css";
import toast, { Toaster } from "react-hot-toast";
import { BsInfoCircleFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";

const Password = ({ user }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [tooltipActive, setTooltipActive] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirm) return;
    if (password !== confirm) {
      toast.error("Passwords don't match.", {
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

    setIsLoading(true);

    const loadingToast = toast.loading("Updating password...", {
      style: {
        fontSize: "13px",
        fontWeight: 500,
        background: "#333",
        color: "#fff",
      },
    });

    const response = await axios.post("/api/admin/profile/update-password", {
      password,
      customerId: user.customerId,
    });

    if (response.data === "success") {
      setIsLoading(false);
      setIsDisabled(true);
      toast.success("Password updated!", {
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
      setPassword("");
      setConfirm("");
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

  useEffect(() => {
    if (password === confirm && password.length >= 8 && confirm.length >= 8) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [password, confirm]);

  return (
    <>
      <Toaster />
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.header}>
          <p className={styles.title}>Your Password</p>
          <BsInfoCircleFill
            size={14}
            onMouseEnter={() => setTooltipActive(true)}
            onMouseLeave={() => setTooltipActive(false)}
          />
          <div
            className={`${styles.tooltip} ${
              tooltipActive ? styles.show : styles.hide
            }`}
          >
            <p className={styles.footerText}>8 characters min</p>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <span className={password ? styles.filled : styles.label}>
              Password
            </span>
          </div>
          <div className={styles.inputContainer} style={{ marginRight: 0 }}>
            <input
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={styles.input}
            />
            <span className={confirm ? styles.filled : styles.label}>
              Confirm
            </span>
          </div>
        </div>
        <div className={styles.switchContainer}>
          <div
            className={styles.switch}
            onClick={() => setShowPassword(!showPassword)}
          >
            <div className={showPassword ? styles.right : styles.ball}></div>
          </div>
          <p className={styles.footerText}>Show password</p>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Update your password.</p>
          <button
            className={
              isLoading || isDisabled ? styles.disabled : styles.confirmBtn
            }
            disabled={isLoading || isDisabled}
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Password;
