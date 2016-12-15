var models = require("../../../models")
module.exports = function* (token,id) {
    var room = yield models.talk_rooms.findById(id)
    if (!room) return Promise.reject("room-not-found")
    if (!~room.users.indexOf(token.user.id)) return Promise.reject("room-not-found")
    return room
}