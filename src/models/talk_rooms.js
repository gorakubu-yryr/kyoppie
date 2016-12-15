module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:{type:String,default:"talk room"},
        users:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
        isOneToOne:Boolean,
    },{
        timestamps:true
    })
    return mongoose.model("talk_rooms",schema)
}