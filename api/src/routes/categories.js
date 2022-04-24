const router = require("express").Router();
const categories = require("./controllers/categories");
const middleware = require("../middleware/protectRoutes");

//prettier-ignore
router
    .route("/")
    .get(categories.get);
   // .post(categories.post)

router.use(middleware.protectRoutes);

router 
.route("/")
.post(categories.post);
module.exports = router;
