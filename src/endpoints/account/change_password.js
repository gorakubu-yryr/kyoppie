module.exports = async function (token,password) {
    var user = token.user
    user.setPassword(password)
    return await user.save()
}
