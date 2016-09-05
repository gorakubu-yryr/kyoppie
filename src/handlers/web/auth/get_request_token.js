var main = require("../../../endpoints/auth/get_request_token");

module.exports = function(req,res){
    main(req.body.appKey,req.body.appSecret,req.body.sigKey).then(function(r){
        res.send({result:true,response:r.toResponseObject()})
    },function(r){
        if(typeof r === "object"){
            console.log(r)
            res.status(503).send({result:false,error:"server-side-error"})
        } else {
            res.status(400).send({result:false,error:r})
        }
    })
}