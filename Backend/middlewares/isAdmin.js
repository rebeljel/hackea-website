const atob = require('atob');

//only Admin allowed

function isAdmin(req, res, next) {
    console.log("Checking if admin rights")
    if (typeof req.headers.authorization !== "undefined") {
        const base64Credentials = req.headers.authorization;
        let data = base64Credentials.split(" ")[1];
        var b64 = atob(data);
        var user = b64.split(":")[3].split(",")[0].slice(1, -1);
        if (user == "admin"){
            next()
        }
        else{
            console.log("Only Admins can perform this action")
            return res.status(403).json({ error: "Not permitted" });
        }
    }
}


module.exports = isAdmin