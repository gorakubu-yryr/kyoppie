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
        },
        isSuspended:{type:Boolean,default:false},
        avatar:{type:mongoose.Schema.Types.ObjectId,ref:"files"},
        avatarUrl:String
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        obj.password = undefined;
        obj.passwordSalt = undefined;
        obj.push = undefined;
        if(obj.avatar && obj.avatar.toResponseObject){
            obj.avatar = this.avatar.toResponseObject();
        }
        return obj;
    }
    return mongoose.model("users",schema)
};
