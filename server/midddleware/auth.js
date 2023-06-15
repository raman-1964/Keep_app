const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access Denied. Authentication failed.");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user_token_details = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token, please logout and login again");
  }
};

module.exports = auth;
