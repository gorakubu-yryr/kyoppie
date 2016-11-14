var getRedisConnection = require("../utils/getRedisConnection")
module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        type:String,
        receiveUser:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        targetApp:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        targetUser:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        targetPost:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
    },{
        timestamps:true
    })
    schema.methods.publish = function(){
        var userId = receiveUser;
        if(userId.id) userId = userId.id;
        var redis = getRedisConnection();
        redis.publish("kyoppie:notifications:"+userId,this.id);
        redis.quit();
    }
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        var toResponseObjects = [
            "receiveUser",
            "targetApp",
            "targetUser",
            "targetPost"
        ];
        var this_ = this;
        toResponseObjects.forEach(function(name){
            if(this_[name] && this_[name].toResponseObject) obj[name]=this_[name].toResponseObject();
        });
        return obj;
    }
    return mongoose.model("notifications",schema)
};
