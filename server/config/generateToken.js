const jwt = require("jsonwebtoken");

function generateToken(id) {
  return jwt.sign({ id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = generateToken;
