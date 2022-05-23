import toast from "react-hot-toast";

export const emailErrorMessage = () =>
  toast.error("Email already in use.", {
    style: {
      fontSize: "13px",
      fontWeight: 500,
      background: "#333",
      color: "#fff",
    },
    iconTheme: {
      primary: "#e6375d",
      secondary: "#fff",
    },
    duration: 5000,
  });
