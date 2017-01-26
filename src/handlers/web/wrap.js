
module.exports = async function (promise,ctx) {
    try {
        var r = await promise
        if (Array.isArray(r)) {
            for (var i = 0; i<r.length; i++) {
                if (r[i].toResponseObject) r[i] = await r[i].toResponseObject(ctx.token)
            }
        }
        if (r.toResponseObject) r = await r.toResponseObject(ctx.token)
        ctx.body = {result:true,response:r}
    } catch (r) {
        if (typeof r === "object") {
            console.log(r)
            ctx.status = 503
            ctx.body = {result:false,error:"server-side-error"}
        } else {
            ctx.status = 400
            ctx.body = {result:false,error:r}
        }
    }
}