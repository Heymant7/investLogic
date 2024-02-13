const express = require("express");
const { loginController, signupController, homeController, policyDocController, getPolicyDataController } = require("../controllers/index");
const router = express.Router();

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/getData', homeController)
router.get('/getPolicyDoc', policyDocController)
router.get('/getPolicyData', getPolicyDataController)
module.exports = router;