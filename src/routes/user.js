const express = require('express');
const router = express.Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
	const users = await prisma.user.findMany();
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
		const user = await prisma.user.create({
			data: {
				name,
				accessibility,
				price,
			},
		});
		await prisma.$disconnect();
		res.json({
			success: true,
			user
		});
	} catch(e) {
		console.error(e);
		await prisma.$disconnect();
		res.json({
			success: false,
			errors: [e]
		})
	}
})

module.exports = router;
