
module.exports = function* (promise,this_){
    try{
        var r = yield promise;
        if(Array.isArray(r)){
            for(var i = 0; i<r.length; i++){
                if(r[i].toResponseObject) r[i] = r[i].toResponseObject();
            }
        }
        if(r.toResponseObject) r = r.toResponseObject();
        console.log(r)
        this_.body = {result:true,response:r};
    }catch(r){
        if(typeof r === "object"){
            console.log(r)
            this_.status = 503;
            this_.body = {result:false,error:"server-side-error"}
        } else {
            this_.status = 400;
            this_.body = {result:false,error:r}
        }
    }
}