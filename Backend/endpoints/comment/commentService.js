const Comment = require("./commentModel");
const { Mongoose } = require('mongoose');
const Post = require("../posts/postModel");

function commentFind(comment, callback) {
    if (!comment) {
        console.log("Keine Query-Parameter gefunden")
    }
    Comment.findById(comment.id)
        .populate([{
            path: 'user',
            select: 'userID'
        },
        {
            path: 'post',
            select: 'title'
        }])
        .then(comment => {
            return callback(null, comment)
        })
        .catch(err => {
            console.log("Comment not found")
            return callback("couldn't find comment" + err, null)
        })
}

function getComments(callback) {
    Comment.find(function (err, comments) {
        if (err) {
            console.log("Fehler bei Suche: " + err)
            return callback(err, null)
        }
        else {
            console.log("Alles super");
            return callback(null, comments)
        }
    })
        .populate([{
            path: 'post',
            select: 'title',
            populate: {
                path: 'user',
                select: 'userID'
            },
        },
        {
            path: 'user',
            select: 'userID'
        }])
}

function getPostComments(params, callback) {
    Comment.find({ 'post': params.postid })
        .populate([
            { path: 'user', select: 'userID' }
        ])
        .then(comment => {
            return callback(null, comment)
        })
        .catch(err => {
            console.log("Comment not found")
            return callback("couldn't find comment" + err, null)
        })
}

function commentCreate(props, params, callback) {
    const comment = new Comment({
        content: props.content,
        user: props.user,
        post: params.postid
    })
    comment.save()
        .then((comment) => {
            console.log("created comment - now find post")
            return Post.findById(params.postid)
        })
        .then(post => {
            console.log("found post")
            console.log(post)
            post.comments.unshift(comment)
            post.save();
            console.log("Comment saved in posts")
            callback(null, comment)
        })
        .catch(err => {
            callback(err, null)
        })

}


function commentDelete(props, callback) {
    console.log(`CommentService: find and delete Comment with ID ${props.id}`);
    Comment.findOneAndDelete({ _id: props.id })
        .then(
            comment => {
                console.log("found the comment")
                return Post.findById(comment.post)
            })
        .then(post => {
            console.log("found post", props.id)
            post.comments.remove(props.id)
            post.save()
            console.log("Comment deleted from posts")
            return callback(null, post)
        })
        .catch(
            err => {
                console.log("Couldn't delete the comment" + err)
                callback(err, null)
            }
        )
}



function commentUpdate(comment, params, callback) {
    const update = { content: comment.content }
    Comment.updateOne({ _id: params.id }, update, function (err, result) {
        if (err) {
            callback(err + "not found", null)
            console.log("not found ")
        }
        else {
            if (result) {
                callback(null, "Comment updated successfully: " + result)
                console.log("Updated the comment successfully")
            }
            else {
                callback("Comment couldn't be updated" + err, null)
                console.log("Couldn't update the comment")
            }
        }
    })
}

module.exports = {
    getComments,
    getPostComments,
    commentCreate,
    commentDelete,
    commentUpdate,
    commentFind
}