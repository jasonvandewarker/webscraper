const rp = require('request-promise');
const fs = require('fs');

const url = ['https://en.wikipedia.org/wiki/jawbox',
            'https://en.wikipedia.org/wiki/Converge_(band)',
            'https://en.wikipedia.org/wiki/My_Bloody_Valentine_(band)',
            'https://en.wikipedia.org/wiki/Pedro_the_Lion',
            'https://en.wikipedia.org/wiki/Sunny_Day_Real_Estate',
            'https://en.wikipedia.org/wiki/Radiohead',
            'https://en.wikipedia.org/wiki/MewithoutYou',
            'https://en.wikipedia.org/wiki/Slowdive',
            'https://en.wikipedia.org/wiki/Refused',
            'https://en.wikipedia.org/wiki/Drive_Like_Jehu'];

for (let i = 0; i < 10; i++) {
  rp(url[i])
    .then(function(html){
      function myWrite(html) {
        fs.writeFile(`./scrape-results/output-${i}.txt`, html, function (err) {
          if (err) {
            console.log(err)
            }
        })
      }
      myWrite(html)
    }).catch(function(err){
        console.log(err)
      });
}

