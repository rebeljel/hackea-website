const atob = require('atob');

//Matches user to req,params or req.body to token

function userMatch(req, res, next) {
    console.log("Checking, if id same as in token or is admin")
    if (typeof req.headers.authorization !== "undefined") {
        const base64Credentials = req.headers.authorization;
        let data = base64Credentials.split(" ")[1];
        var b64 = atob(data);
        var user = b64.split(":")[3].split(",")[0].slice(1, -1);
        console.log(user)
        console.log(req.body.userID + " | " + req.params.userID)
        if (user == req.body.userID || user == req.params.userID || user == "admin") {
            
            console.log("User matches Token, or is admin")
            next();
        }
        else {
            console.log("UserID doesn't match token")
            return res.status(403).json({ error: "User doesn't match token" });
        }
    }
}



module.exports = userMatch