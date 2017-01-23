var models = require("../models")
module.exports = function (route,login) {
    return async function (ctx, next_) {
        if (ctx.request.headers["x-kyoppie-access-token"]) {
            var token = await models.access_tokens.findOne({
                secret:ctx.request.headers["x-kyoppie-access-token"]
            }).populate("app user")
            if (!token.app.isWeb && route.isWeb) return Promise.reject("damedesu")
            if (!token.app.isAdmin && route.isAdmin) return Promise.reject("damedesu-admin")
            if (token) {
                ctx.token=token
            }
        }
        if (login && !ctx_.token) {
            ctx.status = 403
            ctx.body = {response:false,error:"please-login"}
        } else {
            await next_()
        }
    }
}