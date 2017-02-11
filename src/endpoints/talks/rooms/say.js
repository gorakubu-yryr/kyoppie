var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = async function (token,id,text,files) {
    // validate
    if (!text) throw "text-is-require"
    if (!id) throw "room-id-is-require"
    if (!files) files = ""
    var room = models.talk_rooms.findById(id)
    if (!room) throw "room-not-found"
    if (!~room.users.indexOf(token.user.id)) throw "room-not-found"
    // put datas
    var message = new models.talk_messages()
    message.room = room.id
    message.app = token.app
    message.user = token.user
    message.text = text.replace(/\n+/g,"\n")
    var file_ids = files.split(",").map(function(id) {
        if (id.length != 24) return undefined
        return id
    })
    files = await models.files.find({
        _id:{$in:file_ids}
    })
    if (files.length > 1) throw "file-too-many"
    message.files = files
    // save
    await message.save()
    // set flags that whether file used somewhere
    for (var i = 0;i < files.length;i++) {
        if (!files[i].isUse) {
            files[i].isUse = true
            await files[i].save()
        }
    }
    // stream
    var redis = getRedisConnection()
    redis.publish("kyoppie:talks-room-timeline:"+room.id,message.id)
    redis.quit()
    return message
}