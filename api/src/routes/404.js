const router = require("express").Router();
const page404 = require("./controllers/404");

//prettier-ignore
router
    .route("/")
    .get(page404.get);

module.exports = router;
