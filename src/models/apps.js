var newApplicationKey = require("../utils/newApplicationKey")
module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:String,
        appKey:{type:String,default:newApplicationKey},
        appSecret:{type:String,default:newApplicationKey},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        isWeb:Boolean,
        isXAuth:Boolean,
    },{
        timestamps:true
    })
    return mongoose.model("apps",schema)
};