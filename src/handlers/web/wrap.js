
module.exports = function(promise,req,res){
    promise.then(function(r){
        if(Array.isArray(r)){
            for(var i = 0; i<r.length; i++){
                if(r[i].toResponseObject) r[i] = r[i].toResponseObject();
            }
        }
        if(r.toResponseObject) r = r.toResponseObject();
        res.send({result:true,response:r})
    },function(r){
        if(typeof r === "object"){
            console.log(r)
            res.status(503).send({result:false,error:"server-side-error"})
        } else {
            res.status(400).send({result:false,error:r})
        }
    })
}