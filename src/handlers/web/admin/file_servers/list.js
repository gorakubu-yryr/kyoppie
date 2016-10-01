var main = require("../../../../endpoints/admin/file_servers/list");
var wrap = require("../../wrap")

module.exports = function(req,res){
    wrap(main(
        req.token
    ),req,res);
}
