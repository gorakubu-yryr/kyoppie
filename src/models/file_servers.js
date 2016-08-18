module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    name:String,
    host:String,
    port:Number
  },{
    timestamps:true
  })
  return mongoose.model("file_servers",schema)
};