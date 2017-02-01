var models = require("../../../models")
module.exports = async function (token,file) {
    if (!file) return Promise.reject("file-is-required")
    file = await models.files.findById(file)
    if (!file) return Promise.reject("file-not-found")
    if (file.type != "image") return Promise.reject("invalid-file")
    var user = token.user
    user.avatar = file.id
    user.avatarUrl = file.getUrl()
    user.avatarThumbnailUrl = file.getThumbnailUrl()
    await user.save()
    file.isUse = true
    await file.save()
    return {status:"ok"}
}