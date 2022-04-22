require('dotenv').config();
 
  const express = require("express");
    const Stripe = require("stripe");
    const {STRIPE_BACK} = process.env;
    const stripe = new Stripe(`${STRIPE_BACK}`);
    //poner la clave secreta en back y clave publoca en front!!!!!
  
                               
    const cors = require("cors");
     const app = express();
    app.use(express.json()); 
  app.use(cors({ origin: "http://localhost:3000" }));
  
  
    module.exports={

    
    post:async (req, res) => {
      // you can get more data to find in a database, and so on
      
  
    
      try {
        const { id, amount } = req.body;
   console.log('amount',amount)
      console.log('id: ',id)
      console.log('aqui llega')

        const payment = await stripe.paymentIntents.create({
          amount,
          currency: "USD",
          description: "Gaming Keyboard",
          payment_method: id,
          confirm: true, //confirm the payment at the same time
        });
    
        console.log('payment!!!!!!!!!!!!',payment);
    
        return res.status(200).json({ message: "Successful Payment" });
      } catch (error) {
        console.log(error);
        return res.json({ message: error.raw.message });
      }
    }
    


   }
    






















