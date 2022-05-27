import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { email, updatedEmail } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const user = await collection.findOne({ email: email });

    await stripe.customers.update(user.customerId, {
      email: updatedEmail,
    });

    const newEmail = {
      $set: {
        email: updatedEmail,
      },
    };

    await collection.updateOne({ email: email }, newEmail);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
