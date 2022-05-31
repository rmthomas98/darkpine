import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { subscriptionId, customerId } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    await stripe.subscriptions.del(subscriptionId);

    const updatedCustomer = {
      $set: {
        plan: "free",
        paymentStatus: null,
        subscriptionId: null,
        cardDetails: null,
        nextInvoice: null,
      },
    };

    await collection.updateOne({ customerId: customerId }, updatedCustomer);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
