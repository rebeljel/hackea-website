var userService = require('../user/userService')
var config = require('config')
var jwt = require('jsonwebtoken')

function createSessionToken(userID, password, callback) {
    console.log("AuthentificationService: create Token");

    if (!userID && !password) {
        callback("Data is missing", null, null)
        return;
    }

    userService.findUserBy(userID, function (err, user) {
        if (user) {
            console.log("Found user, check the password");

            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log("Password is invalid");
                    callback(err, null);
                }
                else if (isMatch) {
                    console.log("Password is correct. Create token.");
                    var issuedAt = new Date().getTime();
                    var expirationTime = config.get('session.timeout');
                    var expiresAt = issuedAt + (expirationTime * 1000);
                    var privateKey = config.get('session.tokenKey');

                    if (userID == "admin") {
                        let token = jwt.sign({ "user": "admin" }, privateKey, {
                            expiresIn: expiresAt,
                            algorithm: 'HS256'
                        })
                        console.log("Token created: " + token);
                        callback(null, token, user);
                    }
                    else {
                        let token = jwt.sign({ "user": userID }, privateKey, {
                            expiresIn: expiresAt,
                            algorithm: 'HS256'
                        })

                        console.log("Token created: " + token);
                        callback(null, token, user);
                    }

                }
                else {
                    console.log(`UserID and password don't match.`)
                    callback("UserID and password don't match", null);
                }

            })
        }
        else {
            console.log("Session Services: Did not find user for user ID: " + userID);
            callback("AuthentificationService: Did not find user", null);
        }
    })

}

module.exports = {
    createSessionToken
}