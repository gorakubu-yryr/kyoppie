var models = require("../models")
module.exports = function (route,login){
    return function* (next_){
        var this_ = this;
        function* next(){
            if(login && !this_.token){
                this.status_code = 403;
                this.body = {response:false,error:"please-login"}
            } else {
                yield next_;
            }
        }
        if(this.request.headers["x-kyoppie-access-token"]){
            var token = yield models.access_tokens.findOne({
                secret:this.request.headers["x-kyoppie-access-token"]
            }).populate("app user")
            if(!token.app.isWeb && route.isWeb) return Promise.reject("damedesu")
            if(!token.app.isAdmin && route.isAdmin) return Promise.reject("damedesu-admin")
            if(token){
                this.token=token;
            }
            yield next();
        } else {
            yield next();
        }
    }
}