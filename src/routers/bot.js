const router = require("express").Router();
const key = require('../config/urls')
const controller = require('../controllers/bot');

router.post("/", controller.autoRepMessage );

module.exports = router;