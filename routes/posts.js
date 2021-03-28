const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

// router.get('/', (req, res) => {
//     res.send('We are on posts');
// })

router.get('/specific', (req, res) => {
    res.send('We are on specific');
})


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    console.log("Received Request:", req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    // post.save().then(data => {
    //     res.json(data);
    // }).catch(err => {
    //     res.json({message: err});
    // });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/:postId', async (req, res) => {
    try {
        console.log(req.params.postId);
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({_id: req.params.postId});
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});

router.patch('/:postId', async (req, res) => {
    try {
        const post = await Post.updateOne({_id: req.params.postId}, 
            {$set: {title: req.body.title, description: req.body.description}});
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});


module.exports = router;
