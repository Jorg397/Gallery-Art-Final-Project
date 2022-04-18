require('dotenv').config();
const { Customer } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    keyTokens,
  } = process.env;

module.exports= {

    post: async (req, res) => {
        try{
            const {email, password} = req.body;

            const costumer = await Customer.findOne({
                where: {
                    email,
                },
            });

            if(costumer){
                res.status(400).send('Email already exists');
            }else if(email && password){
                const passwordhash = await bcrypt.hash(password, 10);
                const costumer = await Customer.create({
                    email,
                    password: passwordhash,
                });
                const payload={
                    check:true,
                }
                const token = jwt.sign(payload, keyTokens, {
                    expiresIn: '1h',
                })
                res.status(201).json({token:token,message:'usuario y contraseña correctos'});
            }else{
                res.status(400).send('parameters missing');
            }
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    },
    
    loginPost : async (req, res) => {
        const { email , password } = req.body;
        console.log(email, password);
        try {
            if(email && password){
                const costumer = await Customer.findOne({
                    where: {
                        email,
                    },
                });
                if(costumer){
                    const passwordMatch = await bcrypt.compare(password, costumer.password);
                    if(passwordMatch){
                        const payload={
                            check:true,
                        }
                        const token = jwt.sign(payload, keyTokens, {
                            expiresIn: '1h',
                        })
                        res.status(200).json({token:token,message:'usuario y contraseña correctos'});
                    }else{
                        res.status(400).send('password incorrect');
                    }
                }else{
                    res.status(400).send('email incorrect');
                }
            }else{
                res.status(400).send('parameters missing');
            }
            
        } catch (error) {
            console.log(error);
            res.status(400).send('hubo un error ene le server');
        }
    },

}