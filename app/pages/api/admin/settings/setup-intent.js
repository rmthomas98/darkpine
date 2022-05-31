const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    // create setup intent
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
    });

    const clientSecret = setupIntent.client_secret;

    // send setup intent back to frontend
    res.status(200).json({ clientSecret });
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
