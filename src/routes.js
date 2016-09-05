module.exports = [
    {name:"/",method:"get",login:false},

    {name:"/web/register",method:"post",isWeb:true,login:false},
    {name:"/web/login",method:"post",isWeb:true,login:false},

    {name:"/users/show",method:"get",login:false},

    {name:"/auth/get_sigkey",method:"post",login:false},

]
