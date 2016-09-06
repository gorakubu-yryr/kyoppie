var rndstr = require("rndstr");
module.exports = function(mongoose) {
    function generatePinCode() {
        return rndstr({
            length:8,
            chars:'0-9'
        });
    }
    var schema = new mongoose.Schema({
        app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        request_token:{type:mongoose.Schema.Types.ObjectId,ref:"request_tokens"},
        code:{type:String,default:generatePinCode},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj._id = undefined;
        obj.__v = undefined;
        obj.app = undefined;
        return obj;
    }
    return mongoose.model("pin_codes",schema)
};