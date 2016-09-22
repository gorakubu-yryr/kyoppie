var main = require("../../../endpoints/users/list");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
    ),req,res);
}
