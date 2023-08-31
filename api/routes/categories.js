const router = require('express').Router();
const Category = require('../models/Category');

//CREATE CATEGORY
router.post('/', async(req, res) => {
	const newCat = new Category(req.body);
	try {
		const savedCat = await newCat.save();
		res.statusCode = 200;
		res.json(savedCat);
	}
	catch(err) 
	{
		res.status = 500;
		res.json(err);
	}
});

//GET CATEGORY
router.get('/', async(req, res) => {
	try {
		const cats = await Category.find();
		res.statusCode = 200;
		res.json(cats);
	}
	catch(err) 
	{
		res.status = 500;
		res.json(err);
	}
})

module.exports = router;