var main = require("../../../endpoints/files/upload")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.file.buffer
    ),this)
}