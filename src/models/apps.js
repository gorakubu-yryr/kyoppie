var newApplicationKey = require("../utils/newApplicationKey")
module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:String,
        appKey:{type:String,default:newApplicationKey},
        appSecret:{type:String,default:newApplicationKey},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        isWeb:Boolean,
        isAdmin:Boolean,
        isXAuth:Boolean,
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = async function (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        if (this.user && this.user.toResponseObject) obj.user=await this.user.toResponseObject(token)
        return obj
    }
    return mongoose.model("apps",schema)
}