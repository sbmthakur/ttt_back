const express = require("express");
const { getdata } = require("./fetchData.js");
const app = express();

app.get("/:limit", (req, res) => {

  /* limit is the total number of words
   * that will be returned with a succ-
   * essful response
   */
  const limit = req.params.limit;
  res.setHeader("Access-Control-Allow-Origin", "https://ttt-form.herokuapp.com");

  getdata(limit, (err, result) => {
    if (err) {
      res.status(500).end(err);
    }
    else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    }
  });

  function timeoutHandler() {
    return res.status(504).end("Server Timeout");
  }

  /* Timeout response after 10 seconds */
  res.setTimeout(10000, timeoutHandler);
});

app.listen(process.env.PORT || 3000);
