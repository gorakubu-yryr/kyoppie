var main = require("../../../endpoints/auth/get_sigkey.js");

module.exports = function(req,res){
    main(req.query.appKey).then(function(r){
        res.send({result:true,response:r.toResponseObject()})
    },function(r){
        if(typeof r === "object"){
            console.log(r)
            res.sendStatus(503)
            res.send({result:false,error:"server-side-error"})
        } else {
            res.sendStatus(400)
            res.send({result:false,error:r})
        }
    })
}