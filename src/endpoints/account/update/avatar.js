var models = require("../../../models")
module.exports = function* (token,file) {
    if (!file) return Promise.reject("file-is-required")
    file = yield models.files.findById(file)
    if (!file) return Promise.reject("invalid-file")
    if (file.type != "image") return Promise.reject("invalid-file")
    var user = token.user
    user.avatar = file.id
    user.avatarUrl = file.getUrl()
    user.avatarThumbnailUrl = file.getThumbnailUrl()
    yield user.save()
    file.isUse = true
    yield file.save()
    return {status:"ok"}
}