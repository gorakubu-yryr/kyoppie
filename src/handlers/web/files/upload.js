var main = require("../../../endpoints/files/upload")
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        req.file.buffer
    ),this)
}