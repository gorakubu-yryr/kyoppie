var models = require("../../models")
module.exports = function* (text) {
    return yield models.users.find({
        isSuspended:false,
        $or:[
            {name: {$regex: text, $options: "i"}},
            {screenName: {$regex: text, $options: "i"}},
        ]
    }).sort("createdAt")
}
