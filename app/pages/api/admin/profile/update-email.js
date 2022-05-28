import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { email, customerId } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const emailInUse = await collection.findOne({ email: email });
    if (emailInUse) return res.status(200).send("email in use");

    const user = await collection.findOne({ customerId: customerId });

    await stripe.customers.update(user.customerId, {
      email: email,
    });

    const newEmail = {
      $set: {
        email: email,
      },
    };

    await collection.updateOne({ customerId: customerId }, newEmail);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
