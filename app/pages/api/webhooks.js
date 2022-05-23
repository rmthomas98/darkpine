import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  // get event
  const event = req.body;

  // connect to mongodb
  const client = await clientPromise;
  const db = client.db("darkpine");
  const collection = db.collection("users");

  res.status(200).json({ received: true });
};

export default handler;
