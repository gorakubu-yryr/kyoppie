var frisby = require("frisby")

frisby.create("GET request")
    .get("http://localhost:4005/")
    .expectHeader("Content-Type","application/json")
    .expectJSON({
        result:true,
        response:{
            status:"ok"
        }
    })
.toss()

frisby.create("POST request")
    .post("http://localhost:4005/")
    .expectStatus(405)
    .expectJSON({
        result:false,
        error:"invalid-method"
    })
.toss()
