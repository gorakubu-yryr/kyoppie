var main = require("../../../endpoints/files/upload")
var wrap = require("../wrap")

module.exports = function(req,res){
    wrap(main(
        req.file.buffer
    ),req,res)
}