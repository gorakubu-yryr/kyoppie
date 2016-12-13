module.exports = function* (token,password){
    if(!token.user.isValidPassword(password)) return Promise.reject("invalid-password");
    token.user.rulesAgree = true;
    yield token.user.save();
    return "ok"
}