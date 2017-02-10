var getSiteConfig = require("./getSiteConfig")
var fs = require("fs")

module.exports = async function (name, content) {
    var config = await getSiteConfig()
    config[name] = content
    await new Promise(function (resolve,reject) {
        fs.writeFile(__dirname+"/../../site_config.json", JSON.stringify(config), function(err) {
            if (err) reject(err)
            resolve()
        })
    })
}