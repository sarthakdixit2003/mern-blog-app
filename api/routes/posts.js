const router = require('express').Router();
const Post = require('../models/Post');

//CREATE POST
router.post('/', async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.statusCode = 200;
		res.json(savedPost);
	}
	catch(err) {
		res.statusCode = 500;
		res.json(err);
	}
});

//UPDATE POST
router.put('/:id', async (req, res) => {
	try {
		const post = Post.findById(req.params.id);
		if(post.username === req.body.username)
		{
			try {
				const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
					$set: req.body
				}, {new: true});
				res.statusCode = 200;
				res.json(updatedPost);
			}
			catch(err) {
				res.statusCode = 500;
				res.json(err);
			}
		}
		else
		{
			res.statusCode = 401;
			res.json('You can only update your own post');
		}
	}
	catch(err) {
		res.statusCode = 500;
		res.json(err);
	}
});

//GET POST
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.statusCode = 200;
		res.json(post);
	}
	catch (err) {
		res.statusCode = 500;
		res.json(err);
	}
});

//DELETE POST
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		console.log(post.username);
		if(post.username === req.body.username)
		{
			try {
				await post.deleteOne({username: req.body.username});
				res.statusCode = 200;
				res.json('Post has been deleted!');
			}
			catch(err) {
				res.statusCode = 500;
				res.json(err);
			}
		}
		else
		{
			res.statusCode = 401;
			res.json('You can only update your own post');
		}
	}
	catch(err) {
		res.statusCode = 500;
		res.json(err);
	}
});

//GET ALL POSTS
router.get('/', async (req, res) => {
	
	const username = req.query.user;
	const catName = req.query.cat;
	try {
		let posts;
		if(username)
		{
			posts = await Post.find({username: username});
		}
		else if(catName)
		{
			posts = await Post.find({
				categories: {
					$in: [catName]
				}
			})
		}
		else
		{
			posts = await Post.find();
		}
		res.statusCode = 200;
		res.json(posts);
	}
	catch(err) {
		res.statusCode = 500;
		res.json(err);
	}
})

module.exports = router;