var nodemailer = require("nodemailer");
const { Router } = require("express");
const router = Router();

const liString = (name) => {
    return `<li><span>${name}</span></li>`
}

module.exports={

    post: (req, res) => {

const {emailType, email, nombreCompleto,numeroDeOrden,
    productos,total,codigoDeRastreo ,NombreDeGaleria, empresaDeEnvio} = req.body

    let productsString = productos.map((e) => liString(e))
    productsString.join()
switch (emailType){
    case 1:{

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //var transporter = nodemailer.createTransport('smtps://something%40gmail.com:password@smtp.gmail.com');
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com', //'smtp.ethereal.email',
            port:465, ///587,
            auth: {
                user: 'argallery981@gmail.com',//'daisha.ruecker0@ethereal.email',
                pass: 'oaeovsqbikgalzlx',//'SAhZ6zXtEEy7xEYRMv'
                //contraseña de gmail para api: 
                //nombre de contraseña para api: gallery
            }
        });
           // console.log(transporter.options)
            // ${producto.map((e) => (e.name))} x ${producto.map((e) => (e.quantity))}
            var mailOptions = {
                from:"Remitente",
                to: email,
                subject: "Tu compra se ha procesado.",
                //attachDataUrls: true,
                //form: "Thanks~."
    
                html: `<h3>${NombreDeGaleria}</h3><p>Saludos Estimad@ <b>${nombreCompleto}</b></p>
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
        
            }
        //console.log(mailOptions)
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error)
                    //console.log(info)
                    res.status(500).send(error.message);
                } else {
                    res.status(200).json(req.body)
                }
            })
            break
    };
    case 2:{
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //var transporter = nodemailer.createTransport('smtps://something%40gmail.com:password@smtp.gmail.com');
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com', //'smtp.ethereal.email',
            port:465, ///587,
            auth: {
                user: 'argallery981@gmail.com',//'daisha.ruecker0@ethereal.email',
                pass: 'oaeovsqbikgalzlx',//'SAhZ6zXtEEy7xEYRMv'
                //contraseña de gmail para api: 
                //nombre de contraseña para api: gallery
            }
        });
           // console.log(transporter.options)
            // ${producto.map((e) => (e.name))} x ${producto.map((e) => (e.quantity))}
            var mailOptions = {
                from:"Remitente",
                to: email,
                subject: "Despacho de la  compra.",
                //attachDataUrls: true,
                //form: "Thanks~.",
                html: `<h3>${NombreDeGaleria}</h3><p>Saludos estimad@ <b>${nombreCompleto}</b></p>
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
        
            }
        //console.log(mailOptions)
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error)
                    //console.log(info)
                    res.status(500).send(error.message);
                } else {
                    res.status(200).json(req.body)
                }
            })
        break
    

    };


}

    }
}




