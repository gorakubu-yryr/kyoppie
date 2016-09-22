var main = require("../../../endpoints/applications/create");
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.body.name
    ),req,res)
}