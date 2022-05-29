import clientPromise from "../../../../lib/mongodb";
const formidable = require("formidable");
const aws = require("aws-sdk");
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    const customerId = data.fields.customerId;
    const avatar = data.files.avatar;
    const imagePath = avatar.filepath;
    const blob = fs.readFileSync(imagePath);

    const s3 = new aws.S3();

    const uploadedImage = await s3
      .upload({
        Bucket: "darkpine-cloud-io",
        Key: `${customerId}/${avatar.originalFilename}`,
        Body: blob,
      })
      .promise();

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    const newAvatar = {
      $set: {
        avatar: uploadedImage.Location,
      },
    };

    await collection.updateOne({ customerId: customerId }, newAvatar);

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
