var main = require("../../../endpoints/account/change_password");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.body.password
    ),req,res);
}
