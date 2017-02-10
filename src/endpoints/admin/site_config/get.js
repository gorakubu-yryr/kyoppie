var getSiteConfig = require("../../../utils/getSiteConfig")

module.exports = async function (token) {
    if (!token.user.adminFlag.siteConfig) throw "not-permission"
    return getSiteConfig()
}