var main = require("../../endpoints/index");
var wrap = require("./wrap")

module.exports = function(req,res){
    wrap(main(),req,res);
}