var main = require("../../../endpoints/account/update_name");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.body.name
    ),req,res);
}
