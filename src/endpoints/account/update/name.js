module.exports = async function (token,name) {
    var user = token.user
    if (!name || typeof name !== "string") throw "name-is-required"
    if (name.length > 20) throw "name-nagasugi"
    user.name=name
    return await user.save()
}
