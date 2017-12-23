var finalhandler = require('finalhandler')
var http         = require('http')
var Router       = require('router')
let { getdata } = require('./a.js') 
var router = Router()
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  //res.end('Hello World!')
  getdata((err, result) => {
// console.log(JSON.stringify(res))        
res.end(JSON.stringify(result))
  
  });
})
 
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
})
 
server.listen(3000)
