import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { customerId, paymentMethod } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const paymentMethodCard = await stripe.paymentMethods.retrieve(
      paymentMethod
    );
    const { brand, last4, exp_month, exp_year } = paymentMethodCard.card;

    await stripe.paymentMethods.attach(paymentMethod, {
      customer: customerId,
    });

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    const updatedCustomer = {
      $set: {
        cardDetails: { brand, last4, exp_month, exp_year },
      },
    };

    await collection.updateOne({ customerId: customerId }, updatedCustomer);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
