const models = require('../models/index');

const Post = models.postModel;

const createPost = async (req, res) => {
    // res.send('Hello World.')
    try {
        const params = req.body;
        const newPost = new Post({
            userName: params.userName,
            date: params.date,
            image: req.file.filename
        });
        const post = await newPost.save();
        res.status(200).send({success: true, message: 'Response from createPost', data: post});
    } catch (error) {
        res.status(400).send({success: false, message: error.message});
    }
}

const showPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).send({success: true, message: 'Response from showPosts', data: posts});
    } catch (error) {
        res.status(400).send({success: false, message: error.message});
    }
}

module.exports = {
    createPost,
    showPosts,
}
