import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { customerId, subscriptionId, bool } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: bool,
    });

    const updateRenewal = {
      $set: {
        cancelAtPeriodEnd: bool,
      },
    };

    await collection.updateOne({ customerId: customerId }, updateRenewal);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
