import clientPromise from '../../../lib/mongodb'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {
  try {
    console.log(req.body)
    // // get info from frontend
    // const {email, first, last, password} = req.body.accountInfo.data;
    // const plan = req.body.accountInfo.plan
    // const setupIntentId = req.body.accountInfo.setupIntentId

    // // connect to mongodb
    // const client = await clientPromise;
    // const db = client.db('darkpine')
    // const collection = db.collection('users')

    // // retreive setupIntent
    // const setupIntent = await stripe.setupIntents.retrieve({setupIntentId});

    // // get payment method
    // const paymentMethod = setupIntent.payment_method.id;

    // // create customer
    // const customer = await stripe.customers.create({
    //   name: `${first.trim()} ${last.trim()}`,
    //   email: email,
    //   invoice_settings: {
    //     default_payment_method: paymentMethod
    //   }
    // })

    // // create subscription
    // const subscription = await stripe.subscriptions.create({
    //   customer: customer.id,
    //   items: plan === 2 ? [{price: 'price_1L1FSdCujKXJKQzqzfiXezDx'}] : [{price: 'price_1L1FT7CujKXJKQzqBXNmW6re'}],
    //   collection_method: 'charge_automatically'
    // })

    // // create mongodb customer
    // const newCustomer = {
    //   firstName: first.trim(),
    //   lastName: last.trim(),
    //   email: email.trim(),
    //   password: bcrypt.hashSync(password),
    //   customerId: customer.id,
    //   subscriptionId: subscription.id,
    //   cancelAtPeriodEnd: false,
    //   plan: plan === 2 ? 'standard' : 'premium',
    //   paymentStatus: paid,
    //   paymentMethod: paymentMethod,
    //   cardDetails: null,
    //   nextInvoice: null,
    //   invoices: null,
    //   isActive: true,
    //   resetPasswordLink: null,
    //   setupIntentId: null
    // };

    // // insert customer into monogdb
    // await collection.insertOne(newCustomer)

    // // send success message to front end
    // res.status(200).send('success')

  } catch {
    res.status(500).send('error');
  }
}

export default handler;