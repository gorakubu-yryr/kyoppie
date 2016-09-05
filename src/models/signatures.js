module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    appKey:String,
    sigKey:String,
    sigHash:String
  })
  schema.methods.toResponseObject = function(){
    var obj = this.toObject();
    obj._id = undefined;
    obj.__v = undefined;
    obj.appKey = undefined;
    return obj;
  }
  return mongoose.model("signatures",schema)
};