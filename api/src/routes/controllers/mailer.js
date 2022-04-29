require("dotenv").config();
var nodemailer = require("nodemailer");
const { Router } = require("express");
const router = Router();
const { GMAIL_USER, GMAIL_PASSWORD } = process.env;

const liString = (name) => {
  return `<li><span>${name}</span></li>`;
};

module.exports = {
  post: (req, res) => {
    const {
      emailType,
      email,
      nombreCompleto,
      numeroDeOrden,
      productos,
      total,
      codigoDeRastreo,
      empresaDeEnvio,
    } = req.body;

    let productsString = productos.map((e) => liString(e.name));
    productsString.join();
    switch (emailType) {
      case 1: {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465, ///587,
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD,
          },
        });

        var mailOptions = {
          from: "Remitente",
          to: email,
          subject: "Tu compra se ha procesado.",

          html: `<h3>Sotelino</h3><p>Saludos Estimad@ <b>${nombreCompleto}</b></p>
        <p>su compra en nuestro sitio se ha efectuado satisfactoriamente, abajo le mostraremos<br/>
        la informacion de su compra <br/>
        <br/>
       Su Orden de compra: ${numeroDeOrden}<br/></p>
        

        Su obra se llama  ${productsString}
        <br/>
        <br/>
        Precio total: $ ${total} USD <br/>
        Muchas gracias por confiar siempre en nosotros
 
        `,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(500).send({ status: false, message: error.message });
          } else {
            res.status(200).json({ status: true, message: "Email enviado" });
          }
        });
        break;
      }
      case 2: {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465, ///587,
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD,
          },
        });

        var mailOptions = {
          from: "Remitente",
          to: email,
          subject: "Despacho de la  compra.",
          //attachDataUrls: true,
          //form: "Thanks~.",
          html: `<h3>Sotelino</h3><p>Saludos estimad@ <b>${nombreCompleto}</b></p>
                <p>Su orden ha sido despachado al domicilio indicado con la orden de compra , aca le especificamos los detalles del envio <br/>
                <br/>
                <br/>
               Su Orden de compra: ${numeroDeOrden}<br/></p>
                
    
               Empresa de envio: ${empresaDeEnvio}
                <br/>
                <br/>
                Codigo de Rastreo:  ${codigoDeRastreo}  <br/>
                Estamos a disposición por cualquier consulta, no dude en contactarnos. 
                Muchas gracias por confiar siempre en nosotros y preferirnos =)
         
                `,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(500).send({ status: false, message: error.message });
          } else {
            res.status(200).json({ status: true, message: "Email enviado" });
          }
        });
        break;
      }
    }
  },
};
