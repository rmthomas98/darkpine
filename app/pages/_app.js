import "../styles/globals.css";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return <Component {...pageProps} />;
  }

  if (router.pathname.endsWith('/signup') || router.pathname.endsWith('/login')) {
    return (
      <>
        <Nav />
        <Component {...pageProps} />      
      </>
    )
  }

  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
