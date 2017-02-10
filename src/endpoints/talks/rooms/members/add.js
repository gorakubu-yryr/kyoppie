var models = require("../../../../models")
module.exports = async function (token,id,userId) {
    var room = await models.talk_rooms.findById(id)
    if (!room) throw "room-not-found"
    if (!~room.users.indexOf(token.user.id)) throw "room-not-found"
    var user = await models.users.findById(userId)
    if (!user) throw "user-not-found"
    if (~room.users.indexOf(user.id)) throw "already-add"
    room.users.push(user)
    return await room.save()
}