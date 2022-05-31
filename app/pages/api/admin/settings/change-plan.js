import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
