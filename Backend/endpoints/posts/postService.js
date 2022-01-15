const Post = require('./postModel');
const { Mongoose } = require('mongoose');
const User = require('../user/userModel');
const Comment = require('../comment/commentModel')

function postFind(post, callback) {
    if (!post) {
        console.log("Keine Query-Parameter gefunden für " + post)
    }
    console.log(post.id)
    Post.findById(post.id)
        .populate([{
            path: 'user',
            select: 'userID'
        },
        {
            path: 'tags',
            select: 'name'
        },
        {
            path: 'comments',
            select: 'content createdAt',
            populate : {
                path : 'user',
                select: 'userID'
            }
        }
        ])
        .then(post => {
            console.log("found post with id: " + post._id)
            return callback(null, post)
        })
        .catch(err => {
            console.log("Post not found")
            return callback("couldn't find post" + err, null)
        })
}


function getPosts(callback) {
    Post.find(function (err, posts) {
        if (err) {
            console.log("Fehler bei Suche: " + err)
            return callback(err, null)
        }
        else {
            console.log("Alles super");
            return callback(null, posts)
        }
    })
        .populate([{
            path: 'user',
            select: 'userID'
        },
        {
            path: 'tags',
            select: 'name'
        },
        {
            path: 'comments',
            select: 'content createdAt',
            populate : {
                path : 'user',
                select: 'userID'
            }
        }
        ])
}


function userPostFind(params, callback) {
    console.log(params.userID)
    Post.find({ 'user': params.userID })
        .populate([
            { path: 'user', select: 'userID' },
            {
                path: 'comments',
                select: 'content createdAt',
                populate : {
                    path : 'user',
                    select: 'userID'
                }
            }
        ])
        .then(post => {
            return callback(null, post)
        })
        .catch(err => {
            console.log("Post not found")
            return callback("couldn't find post" + err, null)
        })
}

function postCreate(props, params, callback) {
    User.findOne({ userID: params.userID })
        .exec((err, user) => {
            if (user) {
                var newPost = new Post({
                    title: props.title,
                    content: props.content,
                    user: user._id,
                    tags: props.tags
                })
                newPost.save((err, post) => {
                    if (err) {
                        return callback("Error at newPost save " + err, null)
                    }
                    else {
                        user.posts.unshift(post)
                        user.save();
                        console.log("Post was created successfully")
                        return callback(null, post)
                    }
                })
            }
            else {
                callback("Something just didn't work out: " + err, null)
            }
        })
}


function postDelete(props, callback) {
    console.log(`PostService: find and delete Post with ID ${props.id}`);
    Post.findOneAndDelete({ _id: props.id })
        .then(
            post => {
                console.log("found the post")
                return User.findById(post.user)
            })
        .then(user => {
            console.log("found user", user.userID)
            user.posts.remove(props.id)
            user.save()
            console.log("Comment deleted from posts")
            return callback(null, user)
        })
        .catch(
            err => {
                console.log("Couldn't delete the post: " + err)
                callback(err, null)
            }
        )
}

function postUpdate(post, params, callback) {
    const update = { title: post.title, content: post.content, tags: post.tags }
    Post.findOne({ _id: params.id }, function (err, result) {
        if (err) {
            console.log("error in service")
            callback(err, null)
        }
        else {
            if (result) {
                Post.updateOne(result, update, function (err, result) {
                    if (err) {
                        callback(err, null)
                        console.log("not found ")
                    }
                    else {
                        callback(null, result)
                        console.log(result)
                    }
                })
            }
            else {
                console.log("not found... ")
                callback(err, null)
            }
        }
    })

}

module.exports = {
    postCreate,
    postFind,
    getPosts,
    postDelete,
    postUpdate,
    userPostFind
}