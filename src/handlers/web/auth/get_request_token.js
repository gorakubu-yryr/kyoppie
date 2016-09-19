var main = require("../../../endpoints/auth/get_request_token");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.body.appKey,
        req.body.appSecret,
        req.body.sigKey
    ),req,res);
}