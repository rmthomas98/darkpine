import Faq from "../components/Home/Faq/Faq";
import Top from "../components/Plans/Top/Top";
import Switcher from "../components/Plans/Switcher/Switcher";
import Individual from "../components/Plans/Cards/Individual";
import { useState } from "react";
import Business from "../components/Plans/Cards/Business";

const Plans = () => {
  const [plans, setPlans] = useState(1);

  return (
    <>
      <Top />
      <Switcher plans={plans} setPlans={setPlans} />
      <Individual plans={plans} />
      <Business plans={plans} />
      <Faq />
    </>
  );
};

export default Plans;
