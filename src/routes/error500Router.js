import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
	res.send("Error: 500");
});

module.exports = router;
