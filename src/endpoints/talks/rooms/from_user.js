var models = require("../../../models")
module.exports = async function (token,screenName,id) {
    if (!screenName && !id) throw "screenName-or-id-require"
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = await models.users.findById(id)
    }
    if (!user) throw "user-not-found"
    if (user.isSuspended) throw "this-user-is-suspended"
    var room = await models.talk_rooms.findOne({
        isOneToOne:true,
        users:{$in:[user]}
    })
    if (!room) {
        room = new models.talk_rooms({
            users:[token.user,user],
            isOneToOne:true
        })
        await room.save()
    }
    return room
}
