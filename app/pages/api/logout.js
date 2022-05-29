import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  (req, res) => {
    req.session.destroy();
    res.send("success");
  },
  {
    cookieName: "user",
    password: process.env.IRON_SESSION_PASSWORD,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
