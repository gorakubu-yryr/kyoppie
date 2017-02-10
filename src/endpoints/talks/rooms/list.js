var models = require("../../../models")
module.exports = async function (token) {
    return await models.talk_rooms.find({users:token.user.id}).sort("-updatedAt")
}