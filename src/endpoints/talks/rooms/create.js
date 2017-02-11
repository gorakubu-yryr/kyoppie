var models = require("../../../models")
module.exports = async function (token,name) {
    if (name.length > 20 || name.length < 1) throw "invalid-name"
    var room = new models.talk_rooms()
    room.name = name
    room.users.push(token.user)
    room.isUsed=true
    await room.save()
    return room
}