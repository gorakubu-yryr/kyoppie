var models = require("../../models")
module.exports = function(screenName,id){
    return new Promise(function(resolve,reject){
      if(!screenName && !id){
        return reject("screenName-or-id-require")
      }
      function retUser(err,res){
        if(!res){
          return reject("not-found-user")
        }
        return resolve(res)
      }
      if(screenName) {
        models.users.findOne({screenNameLower:screenName.toLowerCase()},retUser)
      } else {
        models.users.findOne({_id:models.mongoose.Types.ObjectId(id)},retUser)
      }
    })
}
