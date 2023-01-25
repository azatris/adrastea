const express = require('express');
const router = express.Router();
const userService = require('../services/userservice');

router.get('/', async (req, res) => {
	const users = await userService.getUsers();
	res.json({
		success: true,
		users,
	});
})

router.post('/', async (req, res) => {
	const { name, accessibility, price } = req.body;
	// If unsupported accessibility or price type is used, return error
	if (!["Low", "Medium", "High"].includes(accessibility) || !["Free", "Low", "High"].includes(price)) {
		res.json({
			success: false,
			errors: ["Unsupported accessibility or price type"]
		});
		return;
	}
	try {
		// Use userService to create user
		const user = await userService.createUser(name, accessibility, price);
		res.json({
			success: true,
			user
		});
	} catch(e) {
		res.json({
			success: false,
			errors: [e]
		})
	}
})

module.exports = router;