var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
}, { timestamps: true }
);


// Exporting module to allow it to be imported in other files 
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
