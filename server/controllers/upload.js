const { asyncHandler } = require("../midddleware/asyncHandler");
const { cloudinary } = require("../utils/cloudinary");

const getSignature = asyncHandler(async (req, res, next) => {
  const { folder, public_id } = req.body;
  if (!public_id) return res.status(400).send({ msg: "user id is necessary" });

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { ...(folder && { folder }), timestamp, public_id },
    process.env.CLOUD_API_SECRET
  );

  res.status(200).send({ signature, timestamp });
});

module.exports = {
  getSignature,
};
