var models = require("../../../models")
module.exports = function* (token) {
    return yield models.talk_rooms.find({users:token.user.id}).sort("-updatedAt")
}