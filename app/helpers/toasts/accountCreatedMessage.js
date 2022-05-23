import toast from "react-hot-toast";

export const accountCreatedMessage = () =>
  toast.success("Your account has been created.", {
    style: {
      fontSize: "13px",
      fontWeight: 500,
      background: "#333",
      color: "#fff",
    },
    iconTheme: {
      primary: "#06ce95",
      secondary: "#fff",
    },
    duration: 5000,
  });
