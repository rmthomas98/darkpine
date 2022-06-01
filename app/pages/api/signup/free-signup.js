import clientPromise from "../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");

const handler = async (req, res) => {
  try {
    // get info from frontend
    const { first, last, email, password } = req.body;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    // check if email is already in use
    const emailInUse = await collection.findOne({ email: email });

    // if emial already in use, send message back to front end
    if (emailInUse) return res.status(200).send("email in use");

    // create the customer in stripe
    const customer = await stripe.customers.create({
      name: `${first.trim()} ${last.trim()}`,
      email: email,
    });

    //create the customer in mongodb
    const newCustomer = {
      firstName: first.trim(),
      lastName: last.trim(),
      email: email.trim(),
      password: bcrypt.hashSync(password),
      avatar: null,
      notifications: null,
      messages: null,
      customerId: customer.id,
      subscriptionId: null,
      cancelAtPeriodEnd: false,
      plan: "free",
      paymentStatus: null,
      currentInvoice: null,
      cardDetails: null,
      nextInvoice: null,
      invoices: null,
      resetPasswordLink: null,
    };

    // insert document into mongodb
    await collection.insertOne(newCustomer);

    // send response back to frontend
    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
