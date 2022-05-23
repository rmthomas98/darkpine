import styles from "./SignupContainer.module.css";
import SignupForm from "../SignupForm/SignupForm";
import Walkthrough from "../Walkthrough/Walkthrough";
import PaymentForm from "../PaymentForm/PaymentForm";
import { useState } from "react";

const SignupContainer = () => {
  const [step, setStep] = useState(1);
  const [accountInfo, setAccountInfo] = useState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Walkthrough step={step} accountInfo={accountInfo} />
        {step === 1 && (
          <SignupForm
            setAccountInfo={setAccountInfo}
            accountInfo={accountInfo}
            setStep={setStep}
          />
        )}
        {step === 2 && <PaymentForm accountInfo={accountInfo} />}
      </div>
    </div>
  );
};

export default SignupContainer;
