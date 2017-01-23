module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        server:{type:mongoose.Schema.Types.ObjectId,ref:"file_servers"},
        host:String,
        path:String,
        type:String,
        isUse:Boolean,
        hash:String,
        isAdminDeleted:Boolean,
        thumbnailPath:String,
    },{
        timestamps:true
    })
    schema.methods.getUrl= function() {
        return this.host+this.path
    }
    schema.methods.getThumbnailUrl = function() {
        if (!this.thumbnailPath) {
            switch (this.type) {
                case 'video':
                    return this.getUrl() + ".thumbnail.jpg"
                case 'image':
                    return this.getUrl()
            }
        }
        return this.host+this.thumbnailPath
    }
    schema.methods.toResponseObject = async function (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        obj.server = undefined
        obj.thumbnailPath = undefined
        obj.thumbnailUrl = this.host + this.thumbnailPath
        if (!obj.isUse) {
            obj.host = undefined
            obj.path = undefined
        } else if (obj.isAdminDeleted) {
            obj.url = obj.host+"/public/admin_deleted.png"
            obj.path = "/public/admin_deleted.png"
            obj.type = "image"
        } else {
            obj.url = obj.host+obj.path
            if (!this.thumbnailPath) {
                switch (obj.type) {
                    case 'video':
                        obj.thumbnailUrl = obj.url + ".thumbnail.jpg"
                        break
                    case 'image':
                        obj.thumbnailUrl = obj.url
                }
            }
        }
        return obj
    }
    return mongoose.model("files",schema)
}