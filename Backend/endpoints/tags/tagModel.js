// Importing modules 
var mongoose = require('mongoose');

// Creating post schema 
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true }
);


const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
