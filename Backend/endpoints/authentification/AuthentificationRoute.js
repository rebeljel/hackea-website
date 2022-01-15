const express = require('express');
const router = express.Router();
const atob = require('atob');


var authentificationService = require('./AuthentificationService')

router.post('/loginBody', function (req, res, next) {

    console.log("Route: Want to create token")

    var userid = req.body.userID;
    var password = req.body.password;

    authentificationService.createSessionToken(userid, password, function (err, token, user) {
        if (token) {
            res.header("Authorization", "Bearer " + token);
            if (user) {
                const { id, userID, userName, isAdministrator, ...partialObject } = user;
                const subset = { id, userID, userName, isAdministrator };
                console.log(JSON.stringify(subset));
                if (user.userID == "admin") {
                    console.log("Authenticated as admin")
                }
                else {
                    console.log("Succesfully authenticated!")
                }
                res.send(subset);
            }
            else {
                console.log("User is null, even though a token has been created. Error: " + err);
            }
        }

        else {
            console.log("Token has not been created, Error: " + err);
            res.send('Could not create token');
        }

    })
})


router.post('/login', function (req, res, next) {

    console.log("Route: Want to create token")

    if (typeof req.headers.authorization != "undefined") {
        const base64Credentials = req.headers.authorization;
        let data = base64Credentials.split(" ")[1];
        console.log("data: " + data)
        var b64 = atob(data);
        console.log(b64)
        var userid = b64.split(":")[0];
        var password = b64.split(":")[1];

        authentificationService.createSessionToken(userid, password, function (err, token, user) {
            if (token) {
                res.header("Authorization", "Bearer " + token);
                if (user) {
                    const { _id, id, userID, userName, isAdministrator, ...partialObject } = user;
                    const subset = { _id, id, userID, userName, isAdministrator };
                    console.log(JSON.stringify(subset));
                    if (user.userID == "admin") {
                        console.log("Authenticated as admin")
                    }
                    else {
                        console.log("Succesfully authenticated!")
                    }
                    res.send(subset);
                }
                else {
                    console.log("User is null, even though a token has been created. Error: " + err);
                }
            }

            else {
                console.log("Token has not been created, Error: " + err);
                res.send('Could not create token');
            }

        })
    }
})

module.exports = router;