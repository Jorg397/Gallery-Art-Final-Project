require("dotenv").config();
const jwt = require("jsonwebtoken");
const { keyTokens } = process.env;

protectRoutes = (req, res, next) => {
  console.log("entra bien protrect");
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, keyTokens, (err, decoded) => {
        if (err) {
          return res.status(401).json({ mensaje: "Token inválida" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      jwt.verify(token, keyTokens, (err, decoded) => {
        if (err) {
          return res.status(401).json({ mensaje: "Token inválida" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {
    res.status(401).json({
      mensaje: "Token no proveída.",
    });
  }
};
module.exports = {
  protectRoutes: protectRoutes,
};
