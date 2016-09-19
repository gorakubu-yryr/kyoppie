var main = require("../../../endpoints/posts/create");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.user,
        req.body.text
    ),req,res)
}