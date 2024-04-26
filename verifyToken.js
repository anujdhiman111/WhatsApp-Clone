const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies && req.cookies.access_token;
    console.log(token);
    if (!token) {
      res.send("Error");
    }

    const decoded = jwt.verify(token, "ProCoder");
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(401).send("Unauthorized");
  }
};

module.exports = isAuthenticated;
