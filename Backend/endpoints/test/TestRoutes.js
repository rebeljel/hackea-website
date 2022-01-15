const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
}) 

router.get('/json', (req, res) => {
    res.json('hallo')
})

router.get('/json2', (req, res)=>{
    res.json({
        name : "jel",
        password : "sujfddf"

    })
})

module.exports = router;