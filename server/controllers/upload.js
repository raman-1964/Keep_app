const { cloudinary } = require("../utils/cloudinary");

const getSignature = async (req, res, next) => {
  try {
    const { folder, userId } = req.body;
    if (!userId) return res.status(400).send("user id is necessary");

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { userId, timestamp, ...(folder && { folder }) },
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
