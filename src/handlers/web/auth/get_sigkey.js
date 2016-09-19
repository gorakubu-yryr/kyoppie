var main = require("../../../endpoints/auth/get_sigkey.js");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.body.appKey
    ),req,res);
}