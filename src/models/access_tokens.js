var rndstr = require("rndstr");
module.exports = function(mongoose) {
  function generateAccessToken() {
      return rndstr()+"-"+rndstr();
  }
  var schema = new mongoose.Schema({
    name:String,
    appId:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    token:{type:String,default:generateAccessToken},
    isDeleted:{type:Boolean,default:false},
  },{
    timestamps:true
  })
  return mongoose.model("access_tokens",schema)
};