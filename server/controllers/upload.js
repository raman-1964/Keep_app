const { cloudinary } = require("../utils/cloudinary");

const getSignature = async (req, res, next) => {
  try {
    const { folder, public_id } = req.body;
    if (!public_id) return res.status(400).send("user id is necessary");

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { ...(folder && { folder }), timestamp, public_id },
      process.env.CLOUD_API_SECRET
    );

    res.status(200).send({ signature, timestamp });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSignature,
};
