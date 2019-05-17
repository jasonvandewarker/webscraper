const rp = require('request-promise');
const fs = require('fs');
var express = require('express');
var cors = require('cors');
var app = express();
var router = express.Router();

var port = process.env.PORT || 8080

app.use(cors());
app.use('/api', router);

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/getScraperResults', function(req, res) {
try {
    let websiteArray = req.query.url.split(',')
    for (let i = 0; i < websiteArray.length; i++) {
        rp(websiteArray[i])
            .then(function(html){
                function myWrite(html) {
                    fs.writeFile(`./scrape-results/output-${i}.txt`, html, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
                myWrite(html)
            })
        }
    res.status(200).json({message: "success"})
}
catch(err) {
    res.status(404).json({error: err})
    res.status(500).json({error: err})
    console.log(err)
}
});

app.listen(port);
console.log('Magic happens on port ' + port);