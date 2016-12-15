module.exports = function* (token,password) {
    var user = token.user
    user.setPassword(password)
    return yield user.save()
}
