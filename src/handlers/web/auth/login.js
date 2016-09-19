var main = require("../../../endpoints/auth/login");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.body.requestToken,
        req.body.screenName,
        req.body.password
    ),req,res)
}