var models = require("../../../models")
module.exports = async function (token,id) {
    var room = await models.talk_rooms.findById(id)
    if (!room) throw "room-not-found"
    if (!~room.users.indexOf(token.user.id)) throw "room-not-found"
    return room
}