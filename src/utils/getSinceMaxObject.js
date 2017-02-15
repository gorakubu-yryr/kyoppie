module.exports = function(since,max) {
    var obj = {$exists:true}
    if (since) obj.$gt = since
    if (max) obj.$lt = max
    return obj
}