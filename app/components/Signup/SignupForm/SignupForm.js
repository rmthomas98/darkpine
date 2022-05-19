import styles from "./SignupForm.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";
import ButtonLoader from "../../ButtonLoader/ButtonLoader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = ({ setAccountInfo, setStep }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // set plan choice in number
  const [plan, setPlan] = useState(1);
  // drop down menu for plan options
  const [selectionContainer, setSelectionContainer] = useState(false);
  // to display loading message
  const [isLoading, setIsLoading] = useState(false);
  // plan selected to display in words
  const [selectedPlan, setSelectedPlan] = useState();
  // state to update inner button content
  const [buttonContent, setButtonContent] = useState();
  // router
  const router = useRouter();

  // set up toast
  const errorMessage = () =>
    toast.error("Something went wrong.", {
      style: {
        fontSize: "14px",
        fontWeight: 700,
      },
      duration: 5000,
    });

  const emailErrorMessage = () =>
    toast.error("Email already in use.", {
      style: {
        fontSize: "14px",
        fontWeight: 700,
      },
      duration: 5000,
    });

  useEffect(() => {
    if (plan == 1) return setButtonContent("Create account");
    return setButtonContent("Continue to payment");
  }, [plan]);

  // function that runs on form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    if (plan !== 1) {
      const response = await axios.post('/api/signup/setup-intent', data);
      if (response.data === 'email in use'){
        setIsLoading(false)
        return emailErrorMessage()
      } else if (response.data === 'error') {
        setIsLoading(false)
        return errorMessage()
      }
      // if no errors
      // set account info and go to payment 
      setAccountInfo({ data, plan, clientSecret: response.data.clientSecret, setupIntentId: response.data.setupIntentId});
      setStep(2);
      setIsLoading(false)
    } else {
      // create free account no need for payment details
      // make call to backend and then redirect to login page
      const response = await axios.post("/api/signup/free-signup", data);
      switch (response?.data) {
        case "success":
          router.push({ pathname: "/login", query: "newAccount" });
          break;
        case "email in use":
          emailErrorMessage();
          setIsLoading(false);
          break;
        case "error":
          errorMessage();
          setIsLoading(false);
          break;
        default:
          return;
      }
    }
  };

  // updates the selected plan
  useEffect(() => {
    switch (plan) {
      case 1:
        setSelectedPlan("Free $0.00 / month");
        break;
      case 2:
        setSelectedPlan("Standard $8.99 / month");
        break;
      case 3:
        setSelectedPlan("Premium $14.99 / month");
        break;
    }
  }, [plan]);

  // automatically updates plan selection from customer
  // from plans page
  useEffect(() => {
    if (!router.query.subscription) return;
    setPlan(Number(router.query.subscription));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Toaster />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Account Information</p>
        <div className={styles.nameContainer}>
          <div
            className={`${styles.inputContainer} ${styles.firstNameContainer}`}
          >
            <span className={watch("first") ? styles.filled : styles.label}>
              First Name
            </span>
            <input
              type="text"
              className={styles.input}
              {...register("first", { required: true })}
            />
            <p
              className={styles.error}
              style={{ opacity: errors.first ? 1 : 0 }}
            >
              * required field
            </p>
          </div>
          <div className={styles.inputContainer} style={{ marginRight: 0 }}>
            <span className={watch("last") ? styles.filled : styles.label}>
              Last Name
            </span>
            <input
              type="text"
              className={styles.input}
              {...register("last", { required: true })}
            />
            <p
              className={styles.error}
              style={{ opacity: errors.last ? 1 : 0 }}
            >
              * required field
            </p>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <span className={watch("email") ? styles.filled : styles.label}>
            Email
          </span>
          <input
            type="email"
            className={styles.input}
            {...register("email", { required: true })}
          />
          <p className={styles.error} style={{ opacity: errors.email ? 1 : 0 }}>
            * required field
          </p>
        </div>
        <div className={styles.inputContainer}>
          <span className={watch("password") ? styles.filled : styles.label}>
            Password
          </span>
          <input
            type="password"
            className={styles.input}
            {...register("password", { required: true, minLength: 8 })}
          />
          <p
            className={styles.error}
            style={{
              opacity:
                errors.password && errors.password?.type !== "minLength"
                  ? 1
                  : 0,
            }}
          >
            * required field
          </p>
          <p
            className={styles.error}
            style={{ opacity: errors.password?.type === "minLength" ? 1 : 0 }}
          >
            * password must be 8 characters
          </p>
        </div>
        <div
          className={styles.inputContainer}
          onClick={() => setSelectionContainer(!selectionContainer)}
        >
          <span className={styles.filled}>Plan</span>
          <div className={styles.input} style={{ cursor: "pointer" }}>
            <p className={styles.planSelected}>
              {selectedPlan}
              <HiChevronDown
                size={18}
                style={{
                  transform: selectionContainer
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "400ms",
                }}
              />
            </p>
          </div>
          <div
            className={styles.planSelectionContainer}
            style={
              selectionContainer
                ? { opacity: 1, height: 111 }
                : { opacity: 0, height: 0 }
            }
          >
            <p className={styles.selection} onClick={() => setPlan(1)}>
              <BsCheckLg
                color="var(--gold)"
                style={{
                  display: plan === 1 ? "block" : "none",
                  marginRight: 10,
                }}
                size={12}
              />{" "}
              Free $0.00 / month
            </p>
            <p className={styles.selection} onClick={() => setPlan(2)}>
              <BsCheckLg
                color="var(--gold)"
                size={12}
                style={{
                  display: plan === 2 ? "block" : "none",
                  marginRight: 10,
                }}
              />{" "}
              Standard $8.99 / month
            </p>
            <p className={styles.selection} onClick={() => setPlan(3)}>
              <BsCheckLg
                color="var(--gold)"
                size={12}
                style={{
                  display: plan === 3 ? "block" : "none",
                  marginRight: 10,
                }}
              />{" "}
              Premium $14.99 / month
            </p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            disabled={isLoading}
            type="submit"
            className={styles.submitBtn}
          >
            {isLoading ? <ButtonLoader /> : buttonContent}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
