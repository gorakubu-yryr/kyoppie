module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    name:String,
    appKey:String,
    appSecret:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    isWeb:Boolean,
    isXAuth:Boolean,
  },{
    timestamps:true
  })
  return mongoose.model("apps",schema)
};