const router = require('express').Router();
const ApiController = require('./api.controller');


router.route('/login')
  .post(ApiController.login);

router.route('/register')
  .post(ApiController.register);




module.exports = router;
