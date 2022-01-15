const express = require('express');
const router = express.Router();

const tagService = require("./tagService")

const auth = require("../../middlewares/auth")
const userMatch = require("../../middlewares/userMatch")
const isAdmin = require("../../middlewares/isAdmin")

router.post('/', auth, isAdmin, (req, res, next) => {
    console.log("TagRoute: Want to create tags");
    tagService.tagCreate(req.body, function (err, tag) {
        if (tag) {
            res.send(tag);
        }
        if (err) {
            res.send(err)
            return err;
        }
    })
})

router.get('/', function (req, res) {
    console.log("TagRoute: Want to get tags");
    tagService.getTags(function (err, tag) {
        if (tag) {
            console.log(req.body)
            res.json(tag);
            console.log("Die Liste aller Objekte ist da");
        }
        else {
            console.log('Error: ' + err)
        }
    })

})


//Delete by id
router.delete('/', auth, isAdmin, (req, res, next) => {
    console.log("TagRoute: want to delete tag")
    tagService.tagDelete(req.body, function (err, tag) {
        if (tag) {
            res.status(200).send("Deleted the tag")
        }
        else {
            res.status(400).json({ err: "Deletion not possible" })
        }
    })
})



//Update post by id
router.put('/:id', auth, isAdmin, (req, res, next) => {
    console.log("TagRoute: want to update tag")
    tagService.tagUpdate(req.body, req.params, function (err, tag) {
        if (tag) {
            res.status(201).send(tag)
        }
        else {
            res.status(403).send(err)
        }
    })
})


module.exports = router;