var main = require("../../../endpoints/applications/show");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.query.id
    ),req,res);
}
