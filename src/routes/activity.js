const express = require('express');
const router = express.Router();
const activityService = require('../services/activityservice');

router.get('/', function(req, res, next) {
	activityService.getTransformedActivity().then(activity => { res.send(activity); });
});

module.exports = router;
