let http = require("http");
let { orderBy } = require("lodash");

/*
 * Use local cache to improve performance slightly
 */
const cache = {
  "etag": "",
  "data": []
};

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
          
        const etag = res.headers["etag"];

          /* Check for change in the 'etag' response header
           * If there is no change, we return the result 
           * from cache. Otherwise, we perform the necessary
           * operations on the result.
           */

        if (cache.etag === etag) {
          return getDataFromCache(); 
        }
          /* Opertions performed on the result: 
           *  Replace line break and carriage return
           *  Replace hyperlinks, numbers and punctuations
           *  Replace / with spaces
           *  Replace space(s) with one single space
           *  Transform the string to lower case
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
        /* Format response */
        for(let word in result) {
          let o = {
            "word": word,
            "count": result[word]
          }; 
          newObj.push(o);
        }
        /* Sort in descending order according to the count */
        const finalResult = orderBy(newObj,["count"], ["desc"]);

        /* Set values for cache */
        cache.etag = etag;
        cache.data = finalResult;

        /* Only return required words and count */
        return cb(null, finalResult.slice(0, limit));

      } catch (e) {
        console.error(e.message);
      }
    });
  }).on("error", (e) => {
    console.error(`Got error: ${e.message}`);
    return cb("Internal Server Error. Please check the logs", null);
  });

  function getDataFromCache() {
    return cb(null, cache.data.slice(0, limit)); 
  }
}

module.exports.getdata = getdata;
