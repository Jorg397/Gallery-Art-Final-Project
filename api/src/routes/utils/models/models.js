const { Customer } = require("../../../db");
const boom = require("@hapi/boom");

module.exports = {
  async findByEmail(email) {
    const customer = await Customer.findOne({
      where: {
        email,
      },
    });
    return customer;
  },
  checkRoles(...roles) {
    return (req, res, next) => {
      const user = req.user;
      if (roles.includes(user.role)) {
        next();
      } else {
        console.log("no tiene permisos", user.role);
        next(boom.unauthorized());
      }
    };
  },
};
