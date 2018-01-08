let assert = require("assert");
let { get } = require("https");

const baseUrl = "https://fierce-falls-36128.herokuapp.com/";

describe("Test API", function() {
  let num = 3;
  let url = baseUrl + num;
  describe(`GET /${num}`, () => {
        
    it("returns 200", (done) => {
        
      get(url, (res) => {
           
        assert.equal(res.statusCode, 200);     
        done(); 
      }); 
        
    }); 
  });
});
