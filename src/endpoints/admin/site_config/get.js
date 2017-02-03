var getSiteConfig = require("../../../utils/getSiteConfig")

module.exports = async function (token) {
    if (!token.user.adminFlag.siteConfig) return Promise.reject("not-permission")
    return getSiteConfig()
}