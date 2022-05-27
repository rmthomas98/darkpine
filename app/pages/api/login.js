import clientPromise from "../../lib/mongodb";
const bcrypt = require("bcryptjs");
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async (req, res) => {
    const { email, password } = req.body;
    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");
    const user = await collection.findOne({ email: email });
    if (!user) return res.status(200).send("user not found");
    bcrypt.compare(password, user.password, async (err, response) => {
      if (response) {
        req.session.user = {
          id: user.customerId,
        };
        await req.session.save();
        res.status(200).send("success");
      } else {
        res.status(200).send("incorrect password");
      }
    });
  },
  {
    cookieName: "user",
    password: "11111111111111111111111111111111",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
