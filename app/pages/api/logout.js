import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  (req, res) => {
    req.session.destroy();
    res.send("success");
  },
  {
    cookieName: "user",
    password: "djsksksjdksldksjaksldkslaksokdls",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
