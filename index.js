const express = require("express");
const { getdata } = require("./fetchData.js");
const app = express();

app.get("/:limit", (req, res) => {

  const limit = req.params.limit;
  res.setHeader("Content-Type", "application/json");
  getdata(limit, (err, result) => {
    //res.header("Access-Control-Allow-Origin", "*.herokuapp.com");
    res.end(JSON.stringify(result));
  });
});

app.listen(process.env.PORT || 3000);
