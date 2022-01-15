// Importing modules 
var mongoose = require('mongoose');

// Creating post schema 
const PostSchema = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
}, { timestamps: true }
);


const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
