var main = require("../../../endpoints/posts/public_timeline");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
    ),req,res)
}