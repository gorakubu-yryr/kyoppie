var main = require("../../../endpoints/posts/show");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.query.id
    ),req,res);
}
