var main = require("../../../endpoints/auth/login");

module.exports = function(req,res){
    main(req.body.requestToken,req.body.screenName,req.body.password).then(function(r){
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