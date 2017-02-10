var fs = require("fs")

module.exports = function () {
    return new Promise(function(resolve, reject) {
        fs.readFile(__dirname+"/../../site_config.json", function(err, res) {
            if (err && err.code !== "ENOENT") return reject(err)
            if (!res) res = "{}"
            try {
                resolve(JSON.parse(res))
            } catch (e) {
                reject(e)
            }
        })
    })
}