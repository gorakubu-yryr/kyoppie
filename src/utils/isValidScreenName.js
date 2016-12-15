module.exports = function(screenName) {
    return /^([0-9a-zA-Z_]{5,20})$/.test(screenName)
}