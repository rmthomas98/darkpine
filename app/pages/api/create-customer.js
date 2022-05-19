const mongodb = require("mongodb");
import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  console.log(req.body);
  try {
    // get info from frontend
    const { first, last, email, password } = req.body.data;
    const plan = req.body.plan;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    // check if email is already in use
    const emailInUse = await collection.findOne({ email: email });

    // if emial already in use, send message back to front end
    if (emailInUse) return res.status(200).send("email in use");

    // create customer in stripe, don't create subscription if plan selected = 1
    if (plan === 1) {
      // create the customer with stripe
      const customer = await stripe.customers.create({
        name: `${first.trim()} ${last.trim()}`,
        email: email,
      });

      //create the customer in mongodb
      const newCustomer = {
        firstName: first.trim(),
        lastName: last.trim(),
        email: email.trim(),
        customerId: customer.id,
        plan: "free",
        isPaid: null,
        paymentMethod: null,
        nextInvoice: null,
        allInvoices: null,
      };

      // insert document into mongodb
      await collection.insertOne(newCustomer);

      // send response back to frontend
      res.status(200).send("success");
    }
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
