var main = require("../../../../endpoints/admin/file_servers/show");
var wrap = require("../../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token,
        req.query.id
    ),req,res);
}
