const atob = require('atob');
const User = require('../endpoints/user/userModel')

//assign roles to admin and user

function checkRights(req, res, next) {
    console.log("Want to distribute the roles")
    if (typeof req.headers.authorization !== "undefined") {
        const base64Credentials = req.headers.authorization;
        let data = base64Credentials.split(" ")[1];
        var b64 = atob(data);
        var user = b64.split(":")[3].split(",")[0].slice(1, -1);
        if (user) {
            if (user == "admin") {
                req.user = "admin";
            }
            else {
                req.user = "user";
                console.log(req.user)
            }
        }
        next();
    }
}


module.exports = checkRights