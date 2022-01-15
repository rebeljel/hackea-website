const jwt = require('jsonwebtoken');
const config = require('config');

//checks, if user or admin authenticated

function isAuthenticated(req, res, next) {
    console.log("Checking authentification")
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        var privateKey = config.get('session.tokenKey');
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(500).json({ error: "Not Authorized" });
                return;
            }
            console.log("This user is authorized")
            return next();
        });
    }
    else {
        res.status(500).json({ error: "Not Authorized" });
        return;
    }
}

module.exports = isAuthenticated