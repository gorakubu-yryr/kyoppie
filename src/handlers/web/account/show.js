var main = require("../../../endpoints/account/show");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token
    ),req,res);
}
