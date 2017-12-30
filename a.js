let http = require("http");
let { orderBy } = require("lodash");

function getdata(limit, cb) {
  http.get("http://terriblytinytales.com/test.txt", (res) => {
    const {
        statusCode
    } = res;
    const contentType = res.headers["content-type"];

    let error;
    if (statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    } else {
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }
    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
          /*Replace line break and carriage return
           * Replace hyperlinks, numbers and punctuations
           * Replace / with spaces
           * Replace space(s) with one single space
           * Transform the string to lower case
           */
        let formattedString = rawData.replace(/(\r\n|\n|\r)/gm," ").replace(/(http\S+|\S+@\S+|\S+\.com\S+|www\.\S+|[0-9]|,|\.|;|\?|–|"|\(|\))/g,"").replace(/\//g," ").replace(/\s+/g," ").toLowerCase();
        let arr = formattedString.split(" ");
        let result = {};

        for(let word of arr){
          if(result.hasOwnProperty(word)) {
            result[word]++; 
          }
          else {
            result[word] = 1; 
          }
        }
        let newObj = [];
        for(let word in result) {
          let o = {
            "word": word,
            "value": result[word]
          }; 
          newObj.push(o);
        }
        const finalResult = orderBy(newObj,["value"], ["desc"]);
        return cb(null, finalResult.slice(0, limit));
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

module.exports.getdata = getdata;
/*
fs.readFile("./test.txt",'utf8', (err, res) => {
  //console.log('RRR: ', res.replace(/[\r\n]+/g," "));
//  let aa = res.replace(/[\r\n]+/g," ")
 // let aa = res.replace(/[\r\n]+/g," ")
  //let bb = aa.replace(/)

          console.log(res.replace(/(\r\n|\n|\r)/gm," ").replace(/(http\S+|\S+@\S+|\S+\.com\S+|www\.\S+|[0-9]|,|\.|;|\?|–|"|\(|\))/g,'').replace(/\//g," ").replace(/\s+/g," ").toLowerCase())
  //console.log(res.replace(/(\r\n|\n|\r)/gm," ").split(" "))
          //console.log(res.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ").replace(/(http\S+|\S+@\S+|\S+\.com\S+|[0-9]|\.|,|\?)/g,''))//replace(/(\.|\?|;|,|")/g,""));
//console.log(res.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ").replace(/(\?|[0-9])/g,"").replace(/\'s/g,""))
})
*/
