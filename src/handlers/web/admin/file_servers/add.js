var main = require("../../../../endpoints/admin/file_servers/add");
var wrap = require("../../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.body.name,
        req.body.url
    ),req,res);
}
