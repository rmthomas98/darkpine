import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { customerId, subscriptionId } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: "always_invoice",
      items: [
        {
          id: subscription.items.data[0].id,
          price: "price_1L1FSdCujKXJKQzqzfiXezDx",
        },
      ],
    });

    const newSubscription = {
      $set: {
        plan: "standard",
      },
    };

    await collection.updateOne({ customerId: customerId }, newSubscription);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
