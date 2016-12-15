module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        room:{type:mongoose.Schema.Types.ObjectId,ref:"talk_rooms"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        text:String,
        files:[{type:mongoose.Schema.Types.ObjectId,ref:"files"}],
        app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
    },{
        timestamps:true
    })
    return mongoose.model("talk_messages",schema)
}