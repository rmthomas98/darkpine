import clientPromise from "../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");

const handler = async (req, res) => {
  try {
    // get info from frontend
    const { email, first, last, password } = req.body.data;
    const plan = req.body.plan;
    const setupIntentId = req.body.setupIntentId;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    // retreive setupIntent
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);

    // get payment method
    const paymentMethod = await stripe.paymentMethods.retrieve(
      setupIntent.payment_method
    );
    const { brand, last4, exp_month, exp_year } = paymentMethod.card;

    // create customer
    const customer = await stripe.customers.create({
      name: `${first.trim()} ${last.trim()}`,
      email: email,
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer.id,
    });

    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });

    // create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price:
            plan === 2
              ? "price_1L1FSdCujKXJKQzqzfiXezDx"
              : "price_1L1FT7CujKXJKQzqBXNmW6re",
        },
      ],
    });

    // create mongodb customer
    const newCustomer = {
      firstName: first.trim(),
      lastName: last.trim(),
      email: email.trim(),
      password: bcrypt.hashSync(password),
      avatar: null,
      notifications: null,
      messages: null,
      customerId: customer.id,
      subscriptionId: subscription.id,
      cancelAtPeriodEnd: false,
      plan: plan === 2 ? "standard" : "premium",
      paymentIntent: null,
      paymentStatus: "paid",
      cardDetails: { brand, last4, exp_month, exp_year },
      nextInvoice: subscription.current_period_end,
      invoices: [
        {
          date: subscription.current_period_start,
          amount: subscription.plan.amount,
        },
      ],
      resetPasswordLink: null,
    };

    // insert customer into monogdb
    await collection.insertOne(newCustomer);

    // send success message to front end
    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
