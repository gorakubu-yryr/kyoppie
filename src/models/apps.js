module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    name:String,
    appKey:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
  },{
    timestamps:true
  })
  return mongoose.model("apps",schema)
};