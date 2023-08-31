const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//REGISTER
router.post('/register', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashPass = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashPass,
		})

		const user = await newUser.save();
		res.statusCode = 200;
		res.json(user);
	} catch (err) {
		res.statusCode = 300;
		res.json(err);
	}
})

//LOGIN
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.json('Wrong Credentials');

		const validate = await bcrypt.compare(req.body.password, user.password);
		!validate && res.json('Wrong Credentials');	

		const { password, ...others } = user._doc;
		res.statusCode = 200;
		res.json(others);

	} catch (err) {
		res.statusCode = 500;
		res.json(err);
	}
})

module.exports = router;