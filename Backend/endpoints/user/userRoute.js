const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

var userService = require('./userService')
const auth = require('../../middlewares/auth')
const userMatch = require('../../middlewares/userMatch')
const checkRights = require('../../middlewares/checkRights')
const roles = require('../../middlewares/roles')
const isAdmin = require('../../middlewares/isAdmin')

//Liste aller User
router.get('/', auth, isAdmin, (req, res, next) => {
    console.log("bin in users route")
    userService.getUsers(function (err, result) {
        if (result) {
            var userMap = Object.values(result);
            var newUserMap = [];
            userMap.forEach((user) => {
                const { id, userID, userName, email, ...partialObject } = user;
                const subset = { id, userID, userName, email };
                newUserMap.push(subset);
            })
            res.send(Object.values(newUserMap));
            console.log("Die Liste aller Objekte ist da");
        }
        else {
            res.send("Es gab Probleme");
        }
    });
});

router.get('/:userID', auth, userMatch, checkRights, (req, res) => {
    console.log("bin in users route")
    const permissionUser = roles.can(req.user).readAny('user')
    const permissionAdmin = roles.can('admin').readAny('user')
    if (permissionUser.granted && permissionAdmin.granted) {
        console.log("Admin and User have permission")
        userService.findUserBy(req.params.userID, function (err, user) {
            if (user) {
                const { id, userID, userName, email, ...partialObject } = user;
                const subset = { id, userID, userName, email };
                console.log(JSON.stringify(subset))
                res.send(subset);
            }
            else {
                console.log("User can't be found. Error: " + err);
            }
        })
    }
    else {
        console.log("You have no permission")
    }
})

//Signup
router.post('/signup', auth, isAdmin, (req, res, next) => {
    console.log("Route: Want to create user");
    userService.userSave(req.body, function (err, user) {
        if (user) {
            const { id, userID, userName, email, ...partialObject } = user;
            const subset = { id, userID, userName, email };
            console.log(JSON.stringify(subset))
            res.send(subset);
        }
        if (user == null || err) {
            res.send(err)
            console.log("User can't be created. Error: " + err);
        }
    })
})

router.delete('/delete', auth, isAdmin, (req, res, next) => {
    console.log("Route: Want to delete user");
    userService.deleteUser(req.body, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(user)
        }
    })
})

router.put('/update/:userID', auth, userMatch, checkRights, (req, res, next) => {
    const permissionUser = roles.can(req.user).updateOwn('user')
    const permissionAdmin = roles.can('admin').updateAny('user')
    if (permissionUser.granted && permissionAdmin.granted) {
        console.log("Route: Want to update user");
        userService.updateUser(req.body, req.params, function (err, user) {
            if (err) {
                res.send(err);
                console.log("Updating not successful")
            }
            if (user) {
                const { id, userID, userName, email, ...partialObject } = user;
                const subset = { id, userID, userName, email };
                console.log(JSON.stringify(subset))
                res.send(subset);
                console.log("Updating was successfull")
            }
            else{
                res.send("Updating not successful");
            }
        })
    }
    else {
        console.log("You have no permission")
    }

})

module.exports = router;