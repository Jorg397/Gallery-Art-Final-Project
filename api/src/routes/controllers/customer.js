require('dotenv').config();
const { Customer } = require('../../db');
const bcrypt = require('bcrypt');

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
                res.status(201).json(costumer);
            }else{
                res.status(400).send('parameters missing');
            }
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    },
    
    get : async (req, res) => {
        const { email , password } = req.body;
        if(email && password){
            const costumer = await Customer.findOne({
                where: {
                    email,
                },
            });
            if(costumer){
                const passwordMatch = await bcrypt.compare(password, costumer.password);
                if(passwordMatch){
                    res.status(200).json('ok');
                }else{
                    res.status(400).send('password incorrect');
                }
            }else{
                res.status(400).send('email incorrect');
            }
        }else{
            res.status(400).send('parameters missing');
        }
    },

}