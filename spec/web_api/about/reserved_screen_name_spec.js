var frisby = require("frisby")

frisby.create("普通にコール")
    .get("http://localhost:4005/about/reserved_screen_name")
    .expectJSON({
        result:true
    })
    .expectJSONTypes(
        "response",[String]
    )
.toss()