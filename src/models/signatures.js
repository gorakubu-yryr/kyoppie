module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
    sigKey:String,
    sigHash:String
  })
  schema.methods.toResponseObject = function(){
    var obj = this.toObject();
    obj._id = undefined;
    obj.__v = undefined;
    obj.app = undefined;
    return obj;
  }
  return mongoose.model("signatures",schema)
};