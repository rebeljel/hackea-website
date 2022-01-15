const express = require('express');
const router = express.Router();

const commentService = require("./commentService")

const auth = require("../../middlewares/auth")
const userMatch = require("../../middlewares/userMatch")
const roles = require('../../middlewares/roles')


router.get('/', function (req, res) {
    console.log("CommentRoute: Want to get comments");
    commentService.getComments(function (err, comment) {
        if (comment) {
            var commentMap = Object.values(comment);
            var newCommentMap = [];
            commentMap.forEach((comment) => {
                const { content, post, user, ...partialObject } = comment;
                const subset = { content, post, user };
                newCommentMap.push(subset);
            })
            res.send(Object.values(newCommentMap));
            console.log("Die Liste aller Objekte ist da");
        }
        else {
            console.log('Error: ' + err)
        }
    })

})

//get Comment by Query ID
router.get('/:id', function (req, res, next) {
    console.log("Route: Want to get one comment");
    commentService.commentFind(req.params, function (err, comment) {
        if (comment) {
            const { content, user, post, id, ...partialObject } = comment;
            const subset = { content, user, post, id };
            console.log(`Comment with id ${req.params.id}  found`)
            res.send(subset);
        }
        else {
            console.log(`Comment with id ${req.params.id} not found`)
            res.status(400).json({ err: "Can't get that comment" })
        }
    })
})

//get Comment for specific post
router.get('/all/:postid', auth, function (req, res) {
    console.log("CommentRoute: Want to get comments");
    commentService.getPostComments(req.params, function (err, comment) {
        if (comment) {
            var commentMap = Object.values(comment);
            var newCommentMap = [];
            commentMap.forEach((comment) => {
                const { content, post, user, ...partialObject } = comment;
                const subset = { content, post, user };
                newCommentMap.push(subset);
            })
            res.send(Object.values(newCommentMap));
            console.log("Die Liste aller Objekte ist da");
        }
        else {
            console.log('Error: ' + err)
        }
    })

})

//Create new Comment

router.post('/newComment/:postid', auth, (req, res, next) => {
    const permissionUser = roles.can('user').createOwn('comment')
    if (permissionUser.granted) {
        console.log("CommentRoute: Want to create comments");
        commentService.commentCreate(req.body, req.params, function (err, comment) {
            if (comment) {
                const { content, user, post, ...partialObject } = comment;
                const subset = { content, user, post };
                console.log(JSON.stringify(subset))
                res.send(subset);
            }
            
            if (err) {
                console.log(err)
                return err;
            } 
        })
    }
})

//Delete by id
router.delete('/:id', auth, (req, res, next) => {
    const permissionUser = roles.can('user').deleteOwn('comment')
    const permissionAdmin = roles.can('admin').deleteAny('comment')
    if (permissionUser.granted && permissionAdmin.granted) {
        console.log("CommentRoute: want to delete comment")
        commentService.commentDelete(req.params, function (err, comment) {
            if (comment) {
                res.status(200).send("Deleted the comment")
            }
            else {
                res.status(400).json({ err: "Deletion not possible" })
            }
        })
    }
})



//Update post by id
router.put('/:id', auth, (req, res, next) => {
    const permissionUser = roles.can('user').updateOwn('comment')
    if (permissionUser.granted) {
        console.log("CommentRoute: want to update comment")
        commentService.commentUpdate(req.body, req.params, function (err, comment) {
            if (comment) {
                res.status(201).send(req.body)
            }
            else {
                res.status(400).send(err)
            }
        })
    }
})


module.exports = router;