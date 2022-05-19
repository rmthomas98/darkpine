const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import clientPromise from '../../../lib/mongodb'

const handler = async (req, res) => {

  try {

    // get email from frontend
    const {email} = req.body;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db('darkpine')
    const collection = db.collection('users');

    //check if email exists in mongodb
    const emailInUse = await collection.findOne({email: email});

    // send messsage back to frontend if email is in use
    if (emailInUse) return res.status(200).send('email in use')

    // create setup intent 
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card']
    })

    const clientSecret = setupIntent.client_secret;
    const setupIntentId = setupIntent.id

    // send setup intent back to frontend
    res.status(200).json({clientSecret, setupIntentId})

  } catch {
    res.status(500).send('error')
  }
}

export default handler;