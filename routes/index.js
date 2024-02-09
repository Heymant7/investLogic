const express = require("express");
const { loginController, signupController, homeController } = require("../controllers/index");
const router = express.Router();

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/getData', homeController)
module.exports = router;