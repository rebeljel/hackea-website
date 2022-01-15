const express = require('express');
const fs = require('fs')
const https = require('https')
var path = require('path');
const cors = require('cors');
const multer = require('multer');

const bodyParser = require('body-parser');

const userRoutes = require('./endpoints/user/userRoute');
const authentificationRoutes = require('./endpoints/authentification/AuthentificationRoute');
const postRoutes = require('./endpoints/posts/postRoute')
const commentRoutes = require('./endpoints/comment/commentRoute')
const tagRoutes = require('./endpoints/tags/tagRoute')

const database = require('./database/db');


const app = express()
app.use(bodyParser.json())
app.use("*", cors())

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('access-control-expose-headers', "*");
    next();
})

const port = 443;

/*Adding the routes */


app.use('/user', userRoutes);
app.use('/authenticate', authentificationRoutes);
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/tags', tagRoutes)


app.use(express.urlencoded({ extended: false }));


database.initDb(function (err, db) {
    if (db) {
        console.log("Anbindung von Datenbank erfolgreich")
    }
    else {
        console.log("Anbindung von Datenbank gescheitert")
    }
})


/*Error Handler*/
app.use(function (req, res, next) {
    res.sendStatus(404)
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke')
})


const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');

const server = https.createServer({ key: key, cert: cert }, app);

app.get('/', (req, res) => {
    res.send('this is a secure server')
})

server.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`)
})
