import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {Router, useRouter} from 'next/router';

const Login = () => {

  const router = useRouter()

  // set up toast
  const newAccountMessage = () =>
    toast.success("Your account has been created.", {
      style: {
        fontSize: "14px",
        fontWeight: 700,
      },
      duration: 5000,
    });

  return (
    <>
      <Toaster />
    </>
  );
};

Login.getInitialProps = ({ query }) => {
  return { query };
};

export default Login;
