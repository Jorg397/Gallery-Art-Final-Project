const router = require("express").Router();
const commentsController = require("./controllers/comments");

//prettier-ignore
router.route("/").get(commentsController.get);

module.exports = router;
