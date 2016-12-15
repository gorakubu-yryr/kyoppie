var models = require("../../../models")
module.exports = function* (token,name) {
    if (name.length > 20 || name.length < 1) return Promise.reject("invalid-name")
    var room = new models.talk_rooms()
    room.name = name
    room.users.push(token.user)
    yield room.save()
    return room
}