const protect = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {
addProduct,
getProducts,
deleteProduct

} = require("../controllers/productController");



router.post("/", protect, addProduct);

router.get("/", getProducts);

router.delete("/:id", deleteProduct);



module.exports = router;
