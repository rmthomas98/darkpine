import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { firstName, lastName, customerId } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const user = await collection.findOne({ customerId: customerId });

    await stripe.customers.update(user.customerId, {
      name: `${firstName.trim()} ${lastName.trim()}`,
    });

    const updatedName = {
      $set: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
    };

    await collection.updateOne({ customerId: customerId }, updatedName);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
