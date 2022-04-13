require('dotenv').config();
const axios = requiere('axios')

module.exports= {
    get(req, res) {
        res.send('product.get');
    },
    post(req, res){
        res.send('product.post');
    }
}