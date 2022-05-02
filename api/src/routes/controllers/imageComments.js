const axios = require("axios");

module.exports = {
  post: (req, res) => {
    const { image } = req.body;
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=a68125cb370ea6cafb03969621fdc8e1&image=${image}`
      )
      .then((response) => {
        console.log("esto responde image ", response);
      })
      .catch((error) => {
        res.send(error);
        console.log("esto responde image error ", error);
      });
  },
};
