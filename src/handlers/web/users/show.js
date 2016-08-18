var main = require("../../../endpoints/users/show");

module.exports = function(req,res){
    main(req.query.screenName,req.query.id).then(function(r){
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
