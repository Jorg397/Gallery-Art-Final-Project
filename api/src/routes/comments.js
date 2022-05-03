const router = require("express").Router();
const commentsController = require("./controllers/comments");

router.route("/").get(commentsController.get);

module.exports = router;
