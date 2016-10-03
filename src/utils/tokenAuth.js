var models = require("../models")
module.exports = function(route,login){
    return function(req,res,next_){
        function next(){
            if(login && !req.token){
                res.status(403).send({response:false,error:"please-login"})
            } else {
                next_();
            }
        }
        if(req.headers["x-kyoppie-access-token"]){
            models.access_tokens.findOne({
                secret:req.headers["x-kyoppie-access-token"]
            }).populate("app user").then(function(token){
                if(!token.app.isWeb && route.isWeb) return Promise.reject("damedesu")
                if(!token.app.isAdmin && route.isAdmin) return Promise.reject("damedesu-admin")
                if(token){
                    req.token=token;
                }
                next();
            },function(){
                res.status(500).send({response:false,error:"server-side-auth-error"})
            })
        } else {
            next();
        }
    }
}