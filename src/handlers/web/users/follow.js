var main = require("../../../endpoints/users/show");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.query.screenName,
        req.query.id
    ),req,res);
}
