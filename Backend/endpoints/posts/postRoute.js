const express = require('express');
const router = express.Router();

const postService = require("./postService")

const auth = require("../../middlewares/auth")

//get all Posts
router.get('/', function (req, res) {
    console.log("Route: Want to get posts");
    postService.getPosts(function (err, post) {
        if (post) {
            var userMap = Object.values(post);
            var newUserMap = [];
            userMap.forEach((post) => {
                const { title, content, user, comments, tags, _id, ...partialObject } = post;
                const subset = { title, content, user, comments, tags, _id};
                newUserMap.push(subset);
            })
            res.send(Object.values(newUserMap));
            console.log("Die Liste aller Objekte ist da");
        }
        else {
            console.log('Error: ' + err)
        }
    })
})

//get Post by Query ID
router.get('/:id', function (req, res, next) {
    console.log("Route: Want to get one post");
    postService.postFind(req.params, function (err, post) {
        if (post) {
            const { title, content, user, comments, tags, _id, ...partialObject } = post;
            const subset = { title, content, user, comments, tags, _id, };
            console.log('Found')
            res.send(subset);
        }
        else {
            console.log(`Post with id ${req.params.id} not found`)
            res.status(400).json({ err: "Can't get that post" })
        }
    })
})


//get Post by User

router.get('/user/:userID', function (req, res, next) {
    console.log("Route: Want to get all posts by userID: " + req.params.userID);
    postService.userPostFind(req.params, function (err, posts) {
        if (posts) {
            var postMap = Object.values(posts);
            var newpostMap = [];
            postMap.forEach((post) => {
                const { title, content, user, comments, tags, _id, ...partialObject } = post;
                const subset = { title, content, user, comments, tags, _id, };
                newpostMap.push(subset);
            })
            res.send(Object.values(newpostMap));
            console.log("Die Liste aller Objekte ist da");
        }
        else {
            console.log('Error: ' + err)
        }
    })
})

//Create new Post
router.post('/newPost/:userID', auth, function (req, res, next) {
    console.log("Route: Want to create post");
    postService.postCreate(req.body, req.params, function (err, post) {
        if (post) {
            const { title, content, user, tags, ...partialObject } = post;
            const subset = { title, content, user, tags };
            res.send(subset);
        }
        else {
            res.send(err)
            console.log('Error: ' + err)
        }
    })
})

//Delete by id
router.delete('/:id', auth, (req, res, next) => {
    console.log("PostRoute: want to delete post")
    postService.postDelete(req.params, function (err, post) {
        if (post) {
            res.status(200).send("Deleted the post")
        }
        else {
            res.status(400).json({ err: "Deletion not possible" })
        }
    })
})

//Update post by id
router.put('/:id', auth, (req, res, next) => {
    console.log("PostRoute: want to update post")
    postService.postUpdate(req.body, req.params, function (err, post) {
        if (post) {
            res.status(201).send(Object.values(req.body))
        }
        else {
            res.sendStatus(404)
        }
    })
})

module.exports = router;