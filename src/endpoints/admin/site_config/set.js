var setSiteConfig = require("../../../utils/setSiteConfig")

module.exports = async function (token, name, content) {
    if (!token.user.adminFlag.siteConfig) throw "not-permission"
    await setSiteConfig(name, content)
    // setSiteConfigが事故ったら上で例外キャッチしてくれるはず
    return true
}