var models = require("../../models")
module.exports = function(screenName,id){
    return new Promise(function(resolve,reject){
      if(!screenName && !id){
        return reject("require-screenName-or-id")
      }
      console.log(screenName);
      var getUser;
      if(screenName) {
        getUser = models.users.findOne({screenNameLower:screenName.toLowerCase()})
      } else {
        getUser = models.users.findOne({id})
      }
      console.log(getUser)
      getUser.then(function(res){
        console.log(res)
        if(!res){
          return reject("not-found-user")
        }
        return resolve(res.toResponseObject())
      })
    })
}
