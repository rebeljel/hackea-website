// Importing modules 
var mongoose = require('mongoose');

// Creating post schema 
const ImageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true }
);


const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
