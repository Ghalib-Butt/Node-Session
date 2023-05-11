const express = require('express');
const postRoutes = express.Router();
const controller = require('../controllers/index');
const upload = require('../middlewares/multer')

postRoutes.post('/post', upload.single('image'), controller.postController.createPost);

module.exports = postRoutes;
