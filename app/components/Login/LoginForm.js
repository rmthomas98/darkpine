import styles from "./LoginForm.module.css";
import { Toaster } from "react-hot-toast";
import { accountCreatedMessage } from "../../helpers/toasts/accountCreatedMessage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import axios from "axios";
import Link from "next/link";
import { CgArrowRight } from "react-icons/cg";
import { incorrectPassword } from "../../helpers/toasts/incorrectPassword";
import { userNotFound } from "../../helpers/toasts/userNotFound";
import { errorMessage } from "../../helpers/toasts/errorMessage";

const LoginForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // function to check if account was just created
  useEffect(() => {
    if (router.query.newAccount) accountCreatedMessage();
  }, []);

  // handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await axios.post("/api/login", data);
    switch (response.data) {
      case "success":
        setIsLoading(false);
        router.push("/admin");
        break;
      case "incorrect password":
        setIsLoading(false);
        incorrectPassword();
        break;
      case "user not found":
        setIsLoading(false);
        userNotFound();
        break;
      default:
        setIsLoading(false);
        errorMessage();
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Toaster />
      <div className={styles.containerWrapper}>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Log in to your account</p>
          <div className={styles.inputContainer}>
            <span className={watch("email") ? styles.filled : styles.label}>
              Email
            </span>
            <input
              type="email"
              className={styles.input}
              {...register("email", { required: true })}
            />
            <p
              className={styles.error}
              style={{ opacity: errors.email ? 1 : 0 }}
            >
              * please enter your email
            </p>
          </div>
          <div className={styles.inputContainer}>
            <span className={watch("password") ? styles.filled : styles.label}>
              Password
            </span>
            <input
              type="password"
              className={styles.input}
              {...register("password", { required: true })}
            />
            <p
              className={styles.error}
              style={{ opacity: errors.password ? 1 : 0 }}
            >
              * please enter your password
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button
              disabled={isLoading}
              type="submit"
              className={isLoading ? styles.disabled : styles.submitBtn}
            >
              {isLoading ? <ButtonLoader /> : "Log in"}
            </button>
          </div>
          <Link href="/">
            <a className={styles.forgotPasswordLink}>Forgot your password?</a>
          </Link>
        </form>
      </div>
      <div className={styles.linkContainer}>
        <p className={styles.accountParagraph}>Don&#39;t have an account?</p>
        <Link href="/plans">
          <a className={styles.createAccountLink}>
            Create an account
            <CgArrowRight style={{ marginLeft: 5 }} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
