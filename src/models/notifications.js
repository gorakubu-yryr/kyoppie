var getRedisConnection = require("../utils/getRedisConnection")
module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        type:String,
        receiveUser:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        targetApp:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        targetUser:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        targetPost:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
        isRead:{type:Boolean,default:false},
    },{
        timestamps:true
    })
    schema.methods.publish = function() {
        var userId = this.receiveUser
        if (userId.id) userId = userId.id
        var redis = getRedisConnection()
        redis.publish("kyoppie:notifications:"+userId,this.id)
        redis.quit()
    }
    schema.methods.toResponseObject = async function (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        var toResponseObjects = [
            "receiveUser",
            "targetApp",
            "targetUser",
            "targetPost"
        ]
        var this_ = this
        var promises = []
        toResponseObjects.forEach(function(name) {
            promises.push(async function () {
                if (this_[name] && this_[name].toResponseObject) obj[name]=await this_[name].toResponseObject(token)
            })
        })
        await Promise.all(promises)
        return obj
    }
    return mongoose.model("notifications",schema)
}
