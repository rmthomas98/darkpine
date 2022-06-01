import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sha256 = require("js-sha256");

const handler = async (req, res) => {
  const event = req.body;
  // const signature = req.headers["stripe-signature"].split(",")[1].split("=")[1];
  // const timestamp = req.headers["stripe-signature"].split(",")[0].split("=")[1];
  // const signed_payload = `${timestamp}.${JSON.stringify(event)}}`;

  // const signingSecret =
  //   "whsec_cea5cad21d72c5b54ab72936e71d733aa62d2f1ad361434e31edabd433ae4250";

  // const generatedHMAC = sha256.hmac(signingSecret, signed_payload);

  // if (generatedHMAC !== signature)
  //   return res.status(400).json({ received: true });

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
        currentInvoice: null,
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
        currentInvoice: event.data.object.id,
      },
    };

    await collection.updateOne({ customerId: customer }, updatedCustomer);
  }

  res.status(200).json({ received: true });
};
export default handler;
