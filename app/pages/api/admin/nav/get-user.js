import clientPromise from "../../../../lib/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";

const handler = withIronSessionApiRoute(
  async (req, res) => {
    const session = req.session.user;
    const id = session.id;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const user = await collection.findOne({ customerId: id });

    res.status(200).json({ avatar: user.avatar });
  },
  {
    cookieName: "user",
    password: "11111111111111111111111111111111",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default handler;
