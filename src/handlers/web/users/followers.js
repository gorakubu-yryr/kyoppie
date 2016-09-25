var main = require("../../../endpoints/users/followers");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.query.screenName,
        req.query.id
    ),req,res);
}
