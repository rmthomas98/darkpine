import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  // get event
  const event = req.body;

  // connect to mongodb
  const client = await clientPromise;
  const db = client.db("darkpine");
  const collection = db.collection("users");

  if (event.type === "invoice.payment_succeeded") {
    const customer = event.data.object.customer;
    const user = await collection.findOne({ customerId: customer });

    if (event.data.object.billing_reason === "subscription_create") {
      return res.status(200).json({ received: true });
    }

    const updatedCustomer = {
      $set: {
        paymentStatus: "paid",
        nextInvoice: event.data.object.period_end,
        paymentIntent: null,
        invoices: [
          ...user.invoices,
          {
            amout: event.data.object.amount_paid,
            date: event.data.object.period_start,
          },
        ],
      },
    };

    await collection.updateOne({ customerId: customer }, updatedCustomer);
  } else if (event.type === "invoice.payment_failed") {
    const customer = event.data.object.customer;

    const updatedCustomer = {
      $set: {
        paymentStatus: "failed",
      },
    };

    await collection.updateOne({ customerId: customer }, updatedCustomer);
  } else if (event.type === "invoice.finalized") {
    const customer = event.data.object.customer;
    if (event.data.object.billing_reason === "subscription_create") {
      return res.status(200).json({ received: true });
    }

    const updatedCustomer = {
      $set: {
        paymentIntent: event.data.object.payment_intent,
      },
    };

    await collection.updateOne({ customerId: customer }, updatedCustomer);
  }

  res.status(200).json({ received: true });
};

export default handler;
