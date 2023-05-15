const express = require('express');
const postRoutes = express.Router();
const controllers = require('../controllers/index');
const upload = require('../middlewares/multer')

postRoutes.post('/post', upload.single('image'), controllers.postController.createPost);
postRoutes.get('/posts', controllers.postController.showPosts)

module.exports = postRoutes;
