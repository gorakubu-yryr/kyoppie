module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    recaptcha:{
      siteKey:String,
      secretKey:String,
      enabled:Boolean
    },
  },{
    timestamps:true
  })
  return mongoose.model("config",schema)
};