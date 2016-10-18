var main = require("../../../endpoints/posts/create");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.body.text,
        req.body.files
    ),req,res)
}