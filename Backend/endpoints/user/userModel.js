// Importing modules 
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// Creating user schema 
const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true },
    userID: { type: String, unique: true },
    userName: String,
    email: String,
    password: String,
    image: { type: String, data: Buffer },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    isAdministrator: { type: Boolean, default: false },
}, { timestamps: true }
);

UserSchema.methods.whoAmI = function () {
    var output = this.userID
        ? "My name is " + this.userName
        : "I don't have a name";
    console.log(output);
}

//mit pre Aktionen registrieren, bevor save ausgeführt wird
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10)
        .then((hashedPassword) => {
            user.password = hashedPassword;
            console.log("Pre-Save: " + user.password + " change: " + this.isModified('password'));
            next();
        })
}, function (err) {
    next(err)
})

//Vergleich von eingegebenen und gespeicherten Passwörtern
UserSchema.methods.comparePassword = function (candidatePassword, next) {
    var user = this;
    bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
        if (err) {
            return next(err);
        }
        else {
            console.log("comparing if it is a match...")
            next(null, isMatch)
        }
    })
}



// Exporting module to allow it to be imported in other files 
const User = mongoose.model("User", UserSchema);
module.exports = User;
