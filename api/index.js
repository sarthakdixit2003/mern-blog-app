const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL)
	.then((result) => {
		console.log('connected');
		app.listen(5000);
	})
	.catch((error) => console.log(error));

const storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, "images")
	},
	filename:(req, file, cb) => {
		cb(null, req.body.name)
	}
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.statusCode = 200;
	res.json("file has been uploaded");
})

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);