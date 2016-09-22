var main = require("../../../endpoints/applications/my");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token
    ),req,res)
}