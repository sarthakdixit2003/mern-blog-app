const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');

//UPDATE
router.put('/:id', async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}
		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body
			}, { new: true });
			res.statusCode = 200;
			res.json('User has been updated');
		}
		catch (err) {
			res.statusCode = 300;
			res.json(err);
		}
	}
	else {
		res.statusCode = 401;
		res.json("Cannot update account details");
	}
});

//DELETE
router.delete('/:id', async (req, res) => {
	if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			try {
				await Post.deleteMany({ username: user.username });
				await User.findByIdAndDelete(req.params.id);
				res.statusCode = 200;
				res.json('User has been deleted');
			}
			catch (err) {
				res.statusCode = 500;
				res.json(err);
			}
		}
		catch (err) {
			res.statusCode = 404;
			res.json('User not found');
		}
	}
	else {
		res.statusCode = 401;
		res.json("Cannot delete account details");
	}
});

//GET USER
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.statusCode = 200;
		res.json(others);
	}
	catch (err) {
		res.statusCode = 500;
		res.json(err);
	}
})

module.exports = router;