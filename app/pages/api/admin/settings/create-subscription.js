import clientPromise from "../../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { customerId, selectedPlan, paymentMethod } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    // get payment method
    const paymentMethodCard = await stripe.paymentMethods.retrieve(
      paymentMethod
    );
    const { brand, last4, exp_month, exp_year } = paymentMethodCard.card;

    await stripe.paymentMethods.attach(paymentMethod, {
      customer: customerId,
    });

    //update customer
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    // create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price:
            selectedPlan === 2
              ? "price_1L1FSdCujKXJKQzqzfiXezDx"
              : "price_1L1FT7CujKXJKQzqBXNmW6re",
        },
      ],
    });

    // update customer
    const updatedCustomer = {
      $set: {
        subscriptionId: subscription.id,
        cancelAtPeriodEnd: false,
        plan: selectedPlan === 2 ? "standard" : "premium",
        paymentStatus: "paid",
        cardDetails: { brand, last4, exp_month, exp_year },
        nextInvoice: subscription.current_period_end,
        invoices: [
          {
            date: subscription.current_period_start,
            amount: subscription.plan.amount,
          },
        ],
        isActive: true,
      },
    };

    await collection.updateOne({ customerId: customerId }, updatedCustomer);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
