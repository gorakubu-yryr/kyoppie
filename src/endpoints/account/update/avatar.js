var models = require("../../../models")
module.exports = async function (token,file) {
    if (!file) throw "file-is-required"
    file = await models.files.findById(file)
    if (!file) throw "file-not-found"
    if (file.type != "image") throw "invalid-file"
    var user = token.user
    user.avatar = file.id
    user.avatarUrl = file.getUrl()
    user.avatarThumbnailUrl = file.getThumbnailUrl()
    await user.save()
    file.isUse = true
    await file.save()
    return {status:"ok"}
}