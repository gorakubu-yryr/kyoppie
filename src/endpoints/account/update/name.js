module.exports = async function (token,name) {
    var user = token.user
    if (!name || typeof name !== "string") return Promise.reject("name-is-required")
    if (name.length > 20) return Promise.reject("name-nagasugi")
    user.name=name
    return await user.save()
}
