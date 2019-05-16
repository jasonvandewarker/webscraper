const rp = require('request-promise');
const fs = require('fs');
var express = require('express');
var app = express();
var router = express.Router();

var port = process.env.PORT || 8080

app.use('/api', router);

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// router.get('/getScraperResults', function(req, res) {
// try {
//     console.log(req.query.url)
//
//     rp(req.query.url)
//         .then(function(html){
//             console.log(html);
//             res.status(200).json({message: html})
//         })
//         .catch(function(err){
//         });

    router.get('/getScraperResults', function(req, res) {
        try {
            debugger
    for (let i = 0; i < req.query.url.length; i++) {
        rp(req.query.url[i])
            .then(function(html){
                function myWrite(html) {
                    fs.writeFile(`./scrape-results/output-${i}.txt`, html, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
                myWrite(html)
                res.json({message: "great success!"})
            }).catch(function(err){
            console.log(err)
        });
    }






}catch(err) {
    res.status(500).json({error: err})
}






});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);