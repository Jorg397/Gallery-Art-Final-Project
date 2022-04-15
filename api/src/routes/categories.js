const router = require("express").Router();
const categories = require("./controllers/categories");

//prettier-ignore
router
    .route("/")
    .get(categories.get)
   // .post(categories.post)
router 
.route("/")
.post(categories.post)
module.exports = router;
