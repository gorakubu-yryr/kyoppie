var models = require("../models")
module.exports = function (route,login) {
    return async function (next_) {
        var this_ = this
        if (this.request.headers["x-kyoppie-access-token"]) {
            var token = await models.access_tokens.findOne({
                secret:this.request.headers["x-kyoppie-access-token"]
            }).populate("app user")
            if (!token.app.isWeb && route.isWeb) return Promise.reject("damedesu")
            if (!token.app.isAdmin && route.isAdmin) return Promise.reject("damedesu-admin")
            if (token) {
                this.token=token
            }
        }
        if (login && !this_.token) {
            this.status = 403
            this.body = {response:false,error:"please-login"}
        } else {
            await next_
        }
    }
}