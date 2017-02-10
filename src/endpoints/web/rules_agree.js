module.exports = async function (token,password) {
    if (!token.user.isValidPassword(password)) throw "invalid-password"
    token.user.rulesAgree = true
    await token.user.save()
    return "ok"
}