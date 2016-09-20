var main = require("../../../endpoints/posts/timeline");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token
    ),req,res)
}