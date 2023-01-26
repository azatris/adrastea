import express from 'express';
import activityService from '../services/activityservice';

const router = express.Router();

router.get('/', function(req, res, next) {
	activityService.getTransformedActivity().then(activity => { res.send(activity); });
});

module.exports = router;
