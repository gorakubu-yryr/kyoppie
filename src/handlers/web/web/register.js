var main = require("../../../endpoints/web/register");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.body.requestToken,
        req.body.name,
        req.body.screenName,
        req.body.password
    ),req,res)
}