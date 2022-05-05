const { Customer } = require("../../../db");
const boom = require("@hapi/boom");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { GMAIL_USER, GMAIL_PASSWORD, keyTokens } = process.env;

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
        next(boom.unauthorized());
      }
    };
  },
  todayDate() {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const yyyy = today.getFullYear();
    const now = `${yyyy}-${mm}-${dd}`;
    return now;
  },

  async sendEmailResetPassword(email) {
    try {
      const customer = await Customer.findOne({
        where: {
          email,
        },
      });
      if (!customer) {
        throw boom.unauthorized();
      }
      const payload = { sub: customer.id_customer };
      const token = jwt.sign(payload, keyTokens, {
        expiresIn: "1h",
      });
      await Customer.update(
        {
          recoveryToken: token,
        },
        {
          where: {
            id_customer: customer.id_customer,
          },
        }
      );

      const link = `http://localhost:3000/resetPassword?token=${token}`;

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: GMAIL_USER, // generated ethereal user
          pass: GMAIL_PASSWORD, // generated ethereal password
        },
      });
      await transporter.sendMail({
        from: GMAIL_USER, // sender address
        to: `${customer.email}`, // list of receivers
        subject: "Recuperar contraseña", // Subject line
        html: `<b>Ingresa a este Link para recuperar tu contraseña 👉👉 ${link} </b>`, // html body
      });
      return { status: true, message: "Email sent" };
    } catch (err) {
      console.log(err);
    }
  },

  async changePass(token, newPassword) {
    try {
      const payload = jwt.verify(token, keyTokens);
      const customer = await Customer.findByPk(payload.sub);
      if (!customer) throw boom.unauthorized();
      if (customer.dataValues.recoveryToken !== token)
        throw boom.unauthorized();

      const hashPassword = await bcrypt.hash(newPassword, 10);

      await Customer.update(
        {
          recoveryToken: null,
          password: hashPassword,
        },
        {
          where: {
            id_customer: customer.id_customer,
          },
        }
      );
      return { status: true, message: "Password changed" };
    } catch (err) {
      console.log(err);
      throw boom.unauthorized();
    }
  },
};
