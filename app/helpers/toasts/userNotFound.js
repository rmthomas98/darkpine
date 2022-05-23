import toast from "react-hot-toast";

export const userNotFound = () =>
  toast.error("User not found.", {
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
