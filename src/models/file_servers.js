var newFileServerSecretKey = require("../utils/newFileServerSecretKey")
module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:String,
        url:String,
        secretKey:{type:String,default:newFileServerSecretKey},
        isEnabled:Boolean,
        uploadSize:Number,
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        return obj;
    }
    return mongoose.model("file_servers",schema)
};