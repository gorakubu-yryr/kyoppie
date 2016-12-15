var models = require("../../../../models")
module.exports = function* (token,id,userId) {
    var room = yield models.talk_rooms.findById(id)
    if (!room) return Promise.reject("room-not-found")
    if (!~room.users.indexOf(token.user.id)) return Promise.reject("room-not-found")
    var user = yield models.users.findById(userId)
    if (!user) return Promise.reject("user-not-found")
    if (~room.users.indexOf(user.id)) return Promise.reject("already-add")
    room.users.push(user)
    return yield room.save()
}