import clientPromise from "../../../../lib/mongodb";
const bcrypt = require("bcryptjs");

const handler = async (req, res) => {
  try {
    const { password, customerId } = req.body;

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const updatedPassword = {
      $set: {
        password: bcrypt.hashSync(password),
      },
    };

    await collection.updateOne({ customerId: customerId }, updatedPassword);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
