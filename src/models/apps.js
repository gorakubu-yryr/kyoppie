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
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        if(this.user && this.user.toResponseObject) obj.user=this.user.toResponseObject();
        return obj;
    }
    return mongoose.model("apps",schema)
};