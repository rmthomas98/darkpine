import styles from "./LoginForm.module.css";
import { Toaster } from "react-hot-toast";
import { accountCreatedMessage } from "../../helpers/toasts/accountCreatedMessage";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (router.query.newAccount) accountCreatedMessage();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Toaster />
      <form className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.label}>Email</span>
          <input type="email" className={styles.input} />
        </div>
        <div className={styles.inputcontainer}></div>
      </form>
    </div>
  );
};

export default LoginForm;
