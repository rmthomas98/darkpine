import "../styles/globals.css";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import NavBar from "../components/Admin/Nav/NavBar/NavBar";
import SideNav from "../components/Admin/Nav/SideNav/SideNav";
import NextNProgress from "nextjs-progressbar";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return (
      <>
        <NextNProgress color="#00684a" />
        <div className="dashboard-flex-container">
          <SideNav />
          <div style={{ width: "100%", paddingBottom: 50 }}>
            <NavBar />
            <Component {...pageProps} />
          </div>
        </div>
      </>
    );
  }

  if (
    router.pathname.endsWith("/signup") ||
    router.pathname.endsWith("/login")
  ) {
    return (
      <>
        <Nav />
        <Component {...pageProps} />
      </>
    );
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
