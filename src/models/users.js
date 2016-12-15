var getHashedPassword = require("../utils/getHashedPassword")
var newPasswordHash = require("../utils/newPasswordHash")
module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:{type:String,default:"no name"},
        screenName:{type:String,required:true},
        screenNameLower:{type:String,required:true},
        password:{type:String,required:true},
        passwordSalt:{type:String,required:true},
        postsCount:{type:Number,default:0},
        followersCount:{type:Number,default:0},
        followingCount:{type:Number,default:0},
        adminLevel:{type:Number,default:0},
        isVerified:{type:Boolean,default:false},
        push:{
            chrome:[String],
            firefox:[String],
            pushbullet:[String]
        },
        adminFlag:{
            fileServer:Boolean,
            userMng:Boolean,
        },
        isSuspended:{type:Boolean,default:false},
        avatar:{type:mongoose.Schema.Types.ObjectId,ref:"files"},
        avatarUrl:String,
        avatarThumbnailUrl:String,
        rulesAgree:{type:Boolean,defualt:false},
    },{
        timestamps:true
    })
    schema.methods.setPassword = function(password) {
        var salt = newPasswordHash(this.screenName)
        var hashPassword = getHashedPassword(password,salt)
        this.password = hashPassword
        this.passwordSalt = salt
    }
    schema.methods.isValidPassword = function(password) {
        var salt = this.passwordSalt
        var hashPassword = getHashedPassword(password,salt)
        return this.password === hashPassword
    }
    schema.methods.toResponseObject = function* (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        obj.password = undefined
        obj.passwordSalt = undefined
        obj.push = undefined
        if (obj.avatar && obj.avatar.toResponseObject) {
            obj.avatar = yield this.avatar.toResponseObject(token)
        }
        return obj
    }
    return mongoose.model("users",schema)
}
