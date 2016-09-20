module.exports = [
    {name:"/",method:"get",login:false},

    {name:"/web/register",method:"post",isWeb:true,login:false},

    {name:"/users/show",method:"get",login:false},

    {name:"/auth/get_sigkey",method:"post",login:false},
    {name:"/auth/get_request_token",method:"post",login:false},
    {name:"/auth/login",method:"post",login:false},
    {name:"/auth/get_access_token",method:"post",login:false},

    {name:"/account/show",method:"get"},
]
