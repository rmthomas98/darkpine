import toast from "react-hot-toast";

export const errorMessage = () =>
  toast.error("An error has occured.", {
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
