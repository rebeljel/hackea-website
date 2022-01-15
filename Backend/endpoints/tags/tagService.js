const Tag = require('./tagModel');
const { Mongoose } = require('mongoose');
const Post = require("../posts/postModel");


function getTags(callback) {
    Tag.find(function (err, tags) {
        if (err) {
            console.log("Fehler bei Suche: " + err)
            return callback(err, null)
        }
        else {
            console.log("Alles super");
            return callback(null, tags)
        }
    })
}



function tagCreate(props, callback) {
    if (!props) {
        console.log("Error: there is no json body")
        callback("JSON-Body missing", null);
        return;
    }
    Tag.findOne({ name: props.name })
        .exec((err, tag) => {
            if (err) {
                return callback("Fehler" + err, null);
            }
            if (tag) {
                return callback(null, `Tag ${props.name} is already in use`);
            }
            else {
                const tag = new Tag({
                    name: props.name
                });
                tag.save(function (err) {
                    if (err) {
                        callback("Could not create tag", null);
                    }
                    else {
                        console.log("Tag Created");
                        callback(null, tag);
                    }
                })
            }
        })
}

function tagDelete(tag, callback) {
    console.log(`TagService: find and delete Tag with ID ${tag.name}`);
    Tag.findOneAndDelete({ name: tag.name })
        .exec(
            (err, tag) => {
                if (tag) {
                    console.log("Deleted " + tag)
                    callback(null, "Tag was successfully deleted")
                }
                else {
                    console.log("Couldn't find Tag")
                    callback(err, null)
                }
            }
        )
}


function tagUpdate(tag, params, callback) {
    const update = { name: tag.name }
    Tag.findOne({ _id: params.id }, function (err, result) {
        if (err) {
            console.log("error in service")
            callback(err, null)
        }
        else {
            if (result) {
                Tag.findOne({name : tag.name})
                    .exec((err, tags) => {
                        if (tags){
                            console.log("tag already exists")
                            callback(`Tag with name "${tag.name}" already exists`, null)
                        }
                        else{
                            result.name = tag.name;
                            result.save();
                            console.log("tag was successfully updated")
                            callback(null, result)
                        }
                    })
            }
            else {
                console.log("tag couldn't be updated")
            }
        }
    })
}

module.exports = {
    tagCreate,
    getTags,
    tagDelete,
    tagUpdate
}