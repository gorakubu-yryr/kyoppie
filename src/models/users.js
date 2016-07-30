module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
    name:String,
    screenName:String,
    password:String,
    postsCount:Number,
    followersCount:Number,
    followingCount:Number,
    adminLevel:{type:Number,default:0},
    isVerified:Boolean,
    push:{
        chrome:[String],
        firefox:[String]
    }
  },{
    timestamps:true
  })
  return mongoose.model("users",schema)
};