import { useEffect, useState } from "react";
import styles from "./Subscription.module.css";
import { HiChevronDown } from "react-icons/hi";
import { BsCheckLg } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import CancelPlanModal from "../Modals/CancelPlanModal/CancelPlanModal";
import RenewPlanModal from "../Modals/RenewPlanModal/RenewPlan";
import ToFree from "../Modals/ToFree/ToFree";
import UpgradeToPremiumModal from "../Modals/UpgradeToPremiumModal/UpgradeToPremiumModal";
import DowngradeToStandardModal from "../Modals/DowngradeToStandardModal/DowngradeToStandardModal";
import PaymentModal from "../Modals/PaymentModal/PaymentModal";

// toast style
const toastStyle = {
  fontSize: "13px",
  fontWeight: 500,
  background: "#333",
  color: "#fff",
};

// toast success styles
const successIconTheme = {
  primary: "#06ce95",
  secondary: "#fff",
};

// toast error style
const errorIconTheme = {
  primary: "#e6375d",
  secondary: "#fff",
};

const Subscription = ({ user }) => {
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // disabled state for change plan button
  const [isDisabled, setIsDisabled] = useState(true);
  //  is drop down selection
  const [selectedPlan, setSelectedPlan] = useState(user.plan);
  // original user plan
  const [userPlan, setUserPlan] = useState();
  // drop down menu state
  const [isActive, setIsActive] = useState(false);

  // modals for managing subscription
  // cancel subscription
  const [cancelPlanModal, setCancelPlanModal] = useState(false);
  // renew plan to cancel the cancellation
  const [renewPlanModal, setRenewPlanModal] = useState(false);
  // change from any subscription to free plan
  const [toFreeModal, setToFreeModal] = useState(false);
  // upgrade from standard to premium
  const [upgradeToPremiumModal, setUpgradeToPremiumModal] = useState(false);
  // downgrade to standard from premium
  const [downgradeToStandardModal, setDowngradeToStandardModal] =
    useState(false);
  // upgrade modal from free to standard
  const [paymentModal, setPaymentModal] = useState(false);

  const router = useRouter();

  // sets the original plan and the selected plan to whatever
  // the user has in mongodb
  useEffect(() => {
    switch (user.plan) {
      case "free":
        setSelectedPlan(1);
        setUserPlan(1);
        break;
      case "standard":
        setSelectedPlan(2);
        setUserPlan(2);
        break;
      case "premium":
        setSelectedPlan(3);
        setUserPlan(3);
    }
  }, [user.plan]);

  // use effect for whenever serversideprops
  // updates plan, it will disable button
  useEffect(() => {
    setIsDisabled(true);
  }, [user.plan]);

  // on plan selection from drop down
  // sets if change plan btn is disabled or not
  const handlePlanSelect = (num) => {
    // sets the selected plan to what number was chosen
    setSelectedPlan(num);
    // check to see if user plan is the same as selected
    if (userPlan === num || user.cancelAtPeriodEnd) {
      // if plan selected is the same that the user already has
      // then set change plan button to disabled
      setIsDisabled(true);
    } else {
      // if plan is different, enable the change plan button
      setIsDisabled(false);
    }
  };

  // delete subscription function if payment is failed
  const handleDeletePlan = async () => {
    setIsLoading(true);

    const loadingToast = toast.loading("Canceling plan...", {
      style: toastStyle,
    });

    const response = await axios.post("/api/admin/settings/delete-plan", {
      subscriptionId: user.subscriptionId,
      customerId: user.customerId,
    });

    if (response.data === "success") {
      setIsLoading(false);
      // show final toast as success
      toast.success("Plan canceled!", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: successIconTheme,
      });
      // refresh props by rerunning getserversideprops
      router.replace(router.asPath);
      // close the modal
      setCancelPlanModal(false);
    } else {
      setIsLoading(false);
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  // function to change cancel at period end for the user
  // which is cancel plan at the next billing period
  // takes in bool which is true false, which will either
  // renew or cancel the plan
  const handleUpdateCancelAtPeriodEnd = async (bool) => {
    // set loading so button cant be pressed again
    setIsLoading(true);
    // init the loading toast for user feedback
    const loadingToast = toast.loading(
      bool ? "Canceling plan..." : "Renewing plan...",
      {
        style: toastStyle,
      }
    );

    // send info to backend
    const response = await axios.post("/api/admin/settings/cancel-renew-plan", {
      subscriptionId: user.subscriptionId,
      customerId: user.customerId,
      bool: bool,
    });

    // check the response and handle it
    if (response.data === "success") {
      setIsLoading(false);
      // show final toast as success
      toast.success(bool ? "Plan canceled!" : "Plan renewed!", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: successIconTheme,
      });
      // refresh props by rerunning getserversideprops
      router.replace(router.asPath);
      // close the modal
      setCancelPlanModal(false);
      setRenewPlanModal(false);
      setToFreeModal(false);
    } else {
      setIsLoading(false);
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  // this function runs when change plan button is pressed
  const handleCheckModal = () => {
    // if user tries to change plan when payment has failed do nothing
    if (user.paymentStatus === "failed") return;
    // if the free plan is selected, we open the downgrade to free modal
    if (selectedPlan === 1) {
      setToFreeModal(true);
      // if premium is selected and the users current plan is standard
      // we open the upgrade to premium modal
    } else if (
      (selectedPlan === 2 && userPlan === 1) ||
      (selectedPlan === 3 && userPlan === 1)
    ) {
      setPaymentModal(true);
    } else if (selectedPlan === 3 && userPlan === 2) {
      setUpgradeToPremiumModal(true);
    } else {
      // this is for downgrade modal
      // only from premium to standard because we already have
      // to free modal for other downgrades
      setDowngradeToStandardModal(true);
    }
  };

  //function to downgrade from premium to standard
  const handleDowngradePlan = async () => {
    setIsLoading(true);

    const loadingToast = toast.loading("Updating plan...", {
      style: toastStyle,
    });

    const response = await axios.post(
      "/api/admin/settings/downgrade-standard",
      {
        subscriptionId: user.subscriptionId,
        customerId: user.customerId,
      }
    );

    if (response.data === "success") {
      // end loading so button can be pressed again
      setIsLoading(false);
      // set success toast
      toast.success("Plan updated!", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: successIconTheme,
      });
      // refresh serversideprops
      router.replace(router.asPath);
      // close the modal
      setDowngradeToStandardModal(false);
    } else {
      // end loading so change plan button can be pressed again
      setIsLoading(false);
      // show error toast
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  // function to upgrade from standard to premium
  const handleUpgradePlan = async () => {
    // set loading to disable button
    setIsLoading(true);
    // init loading toast
    const loadingToast = toast.loading("Upgrading plan...", {
      style: toastStyle,
    });

    // make call to backend
    const response = await axios.post("/api/admin/settings/upgrade-premium", {
      subscriptionId: user.subscriptionId,
      customerId: user.customerId,
    });

    // check response
    if (response.data === "success") {
      // end loading so button can be pressed again
      setIsLoading(false);
      // set success toast
      toast.success("Plan upgraded!", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: successIconTheme,
      });
      // refresh serversideprops
      router.replace(router.asPath);
      // close the modal
      setUpgradeToPremiumModal(false);
    } else {
      // end loading so change plan button can be pressed again
      setIsLoading(false);
      // show error toast
      toast.error("An error has occured", {
        id: loadingToast,
        style: toastStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  // cancel plan button component
  const CancelPlanButton = () => {
    return (
      <button
        disabled={isLoading || user.plan === "free"}
        style={{ marginRight: 5 }}
        className={user.plan === "free" ? styles.disabled : styles.cancelBtn}
        onClick={() => setCancelPlanModal(true)}
      >
        Cancel
      </button>
    );
  };

  // renew plan button component
  const RenewPlanButton = () => {
    return (
      <button
        disabled={isLoading}
        className={styles.renewBtn}
        onClick={() => setRenewPlanModal(true)}
      >
        Renew
      </button>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Your Subscription</p>
        </div>
        <div className={styles.mainContainer}>
          <p className={styles.currentPlan}>Current Plan - {user.plan}</p>
          <div className={styles.inputContainer}>
            <div
              className={styles.input}
              style={{ cursor: user.cancelAtPeriodEnd ? "default" : "pointer" }}
              onClick={() =>
                setIsActive(
                  user.cancelAtPeriodEnd || user.paymentStatus === "failed"
                    ? null
                    : !isActive
                )
              }
            >
              {selectedPlan === 1 && (
                <p className={styles.inputText}>Free $0.00 / month</p>
              )}
              {selectedPlan === 2 && (
                <p className={styles.inputText}>Standard $7.99 / month</p>
              )}
              {selectedPlan === 3 && (
                <p className={styles.inputText}>Premium $12.99 / month</p>
              )}
              <HiChevronDown
                style={{
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "300ms",
                }}
              />
            </div>
            <div
              className={styles.dropDownContainer}
              style={{ height: isActive ? 93 : 0, opacity: isActive ? 1 : 0 }}
              onClick={() => setIsActive(false)}
            >
              <div
                className={styles.dropDownSelection}
                onClick={() => handlePlanSelect(1)}
              >
                {selectedPlan === 1 && (
                  <BsCheckLg size={12} style={{ marginRight: 10 }} />
                )}
                <p>Free $0.00 / month</p>
              </div>
              <div
                className={styles.dropDownSelection}
                onClick={() => handlePlanSelect(2)}
              >
                {selectedPlan === 2 && (
                  <BsCheckLg size={12} style={{ marginRight: 10 }} />
                )}
                <p>Standard $7.99 / month</p>
              </div>
              <div
                className={styles.dropDownSelection}
                onClick={() => handlePlanSelect(3)}
              >
                {selectedPlan === 3 && (
                  <BsCheckLg size={12} style={{ marginRight: 10 }} />
                )}
                <p>Premium $12.99 / month</p>
              </div>
            </div>
          </div>
          {user.cancelAtPeriodEnd && (
            <p className={styles.cancelDate}>
              Your plan will downgrade to free on{" "}
              {format(new Date(user.nextInvoice * 1000), "MMMM dd yyyy")}
            </p>
          )}
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Manage subscription.</p>
          <div className={styles.buttonContainer}>
            {user.cancelAtPeriodEnd ? (
              <RenewPlanButton />
            ) : (
              <CancelPlanButton />
            )}
            <button
              disabled={
                isLoading ||
                isDisabled ||
                user.cancelAtPeriodEnd ||
                user.paymentStatus === "failed"
              }
              onClick={() => handleCheckModal()}
              className={
                isLoading || isDisabled || user.cancelAtPeriodEnd
                  ? styles.disabled
                  : styles.confirmBtn
              }
            >
              Change Plan
            </button>
          </div>
        </div>
      </div>
      <CancelPlanModal
        setCancelPlanModal={setCancelPlanModal}
        cancelPlanModal={cancelPlanModal}
        handleUpdateCancelAtPeriodEnd={handleUpdateCancelAtPeriodEnd}
        isLoading={isLoading}
        handleDeletePlan={handleDeletePlan}
        paymentStatus={user.paymentStatus}
      />
      <RenewPlanModal
        setRenewPlanModal={setRenewPlanModal}
        renewPlanModal={renewPlanModal}
        handleUpdateCancelAtPeriodEnd={handleUpdateCancelAtPeriodEnd}
        isLoading={isLoading}
      />
      <ToFree
        toFreeModal={toFreeModal}
        setToFreeModal={setToFreeModal}
        isLoading={isLoading}
        handleUpdateCancelAtPeriodEnd={handleUpdateCancelAtPeriodEnd}
      />
      <UpgradeToPremiumModal
        setUpgradeToPremiumModal={setUpgradeToPremiumModal}
        upgradeToPremiumModal={upgradeToPremiumModal}
        isLoading={isLoading}
        handleUpgradePlan={handleUpgradePlan}
      />
      <DowngradeToStandardModal
        setDowngradeToStandardModal={setDowngradeToStandardModal}
        downgradeToStandardModal={downgradeToStandardModal}
        isLoading={isLoading}
        handleDowngradePlan={handleDowngradePlan}
      />
      <PaymentModal
        setPaymentModal={setPaymentModal}
        paymentModal={paymentModal}
        customerId={user.customerId}
        selectedPlan={selectedPlan}
      />
      <Toaster />
    </>
  );
};

export default Subscription;
