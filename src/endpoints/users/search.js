var models = require("../../models")
module.exports = async function (text) {
    return await models.users.find({
        isSuspended:false,
        $or:[
            {name: {$regex: text, $options: "i"}},
            {screenName: {$regex: text, $options: "i"}},
        ]
    }).sort("createdAt")
}
