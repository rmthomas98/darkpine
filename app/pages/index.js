import Head from "next/head";
import Top from "../components/Home/Top/Top";
import Info from "../components/Home/Info/Info";
import Team from "../components/Home/Team/Team";
import Task from "../components/Home/Task/Task";
import Share from "../components/Home/Share/Share";
import Options from "../components/Home/Options/Options";
import Faq from "../components/Home/Faq/Faq";
import Start from "../components/Home/Start/Start";

const Index = () => {
  return (
    <>
      <Head>
        <title>Darkpine | Cloud Computing Service</title>
      </Head>
      <Top />
      <Info />
      <Team />
      <Task />
      <Share />
      <Options />
      <Faq />
      <Start />
    </>
  );
};

export default Index;
