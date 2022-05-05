const { Strategy } = require("passport-local");
const { findByEmail } = require("../../models/models");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const LocalStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      delete user.dataValues.recoveryToken;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
